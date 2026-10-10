import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789';
const FRAME_MS = 45;
const FRAMES_PER_CHAR = 2;
const SCRAMBLE_FRAMES = 10;

interface Glyph {
  final: string;
  shown: string;
  done: boolean;
}

/**
 * Texto que aparece "decodificándose" estilo Matrix: cada carácter muestra glifos
 * aleatorios y se fija de izquierda a derecha. El ancho de cada letra se reserva con
 * el carácter final invisible, así el texto no salta mientras se anima. Las letras se
 * agrupan por palabra para que el salto de línea nunca corte una palabra a la mitad.
 */
@Component({
  selector: 'app-matrix-text',
  template: `
    <span class="sr-only">{{ text() }}</span>
    <span aria-hidden="true">
      @for (word of words(); track $index; let last = $last) {
        <span class="whitespace-nowrap">
          @for (g of word; track $index) {
            <span class="relative inline-block">
              <span class="invisible">{{ g.final }}</span>
              <span class="absolute inset-0 flex justify-center" [class.opacity-60]="!g.done">{{
                g.shown
              }}</span>
            </span>
          }
        </span>
        @if (!last) {
          {{ ' ' }}
        }
      }
    </span>
  `,
})
export class MatrixText implements OnInit {
  readonly text = input.required<string>();

  protected readonly words = signal<Glyph[][]>([]);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const words = this.text().split(' ').map((w) => [...w]);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      this.words.set(words.map((w) => w.map((c) => ({ final: c, shown: c, done: true }))));
      return;
    }

    let frame = 0;
    let allDone = false;
    const render = () => {
      // Posición global de cada letra (contando espacios) para el barrido de izquierda a derecha.
      let pos = 0;
      allDone = true;
      this.words.set(
        words.map((w) => {
          const glyphs = w.map((c) => {
            const done = frame >= SCRAMBLE_FRAMES + pos++ * FRAMES_PER_CHAR;
            if (!done) allDone = false;
            return { final: c, shown: done ? c : randomGlyph(), done };
          });
          pos++;
          return glyphs;
        }),
      );
    };

    render();
    const id = setInterval(() => {
      frame++;
      render();
      if (allDone) clearInterval(id);
    }, FRAME_MS);

    this.destroyRef.onDestroy(() => clearInterval(id));
  }
}

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}
