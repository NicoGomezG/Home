import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GithubContributionDay, GithubService } from '../../core/services/github.service';

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEVEL_COLORS = ['#262626', '#0e4429', '#006d32', '#26a641', '#39d353'];

@Component({
  selector: 'app-github-calendar',
  templateUrl: './github-calendar.html',
})
export class GithubCalendar implements AfterViewInit {
  private readonly github = inject(GithubService);
  private readonly scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');

  readonly username = input.required<string>();

  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly weeks = signal<(GithubContributionDay | null)[][]>([]);
  protected readonly total = signal(0);

  protected readonly svgWidth = computed(() => Math.max(this.weeks().length * STEP, STEP));
  protected readonly svgHeight = 7 * STEP;

  constructor() {
    effect(() => {
      const username = this.username();
      this.loading.set(true);
      this.error.set(false);

      this.github
        .getContributions(username)
        .then(({ total, days }) => {
          this.weeks.set(this.buildWeeks(days));
          this.total.set(total);
        })
        .catch(() => this.error.set(true))
        .finally(() => {
          this.loading.set(false);
          queueMicrotask(() => this.scrollToEnd());
        });
    });
  }

  ngAfterViewInit(): void {
    this.scrollToEnd();
  }

  protected colorFor(day: GithubContributionDay | null): string {
    return LEVEL_COLORS[day?.level ?? 0];
  }

  protected x(weekIndex: number): number {
    return weekIndex * STEP;
  }

  protected y(dayIndex: number): number {
    return dayIndex * STEP;
  }

  private buildWeeks(days: GithubContributionDay[]): (GithubContributionDay | null)[][] {
    if (days.length === 0) return [];

    const startPad = new Date(days[0].date + 'T00:00:00').getDay();
    const padded: (GithubContributionDay | null)[] = [
      ...Array(startPad).fill(null),
      ...days,
    ];

    while (padded.length % 7 !== 0) {
      padded.push(null);
    }

    const weeks: (GithubContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7));
    }
    return weeks;
  }

  private scrollToEnd(): void {
    const el = this.scrollContainer()?.nativeElement;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }
}
