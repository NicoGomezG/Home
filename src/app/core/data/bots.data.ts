import { Bot } from '../models/project.model';

/**
 * Placeholder de bots de Discord. El control de acceso (login/roles antes de
 * descargar) todavía no está definido; por ahora solo se muestra el listado.
 */
export const PLACEHOLDER_BOTS: Bot[] = [
  {
    id: 'bot-placeholder-1',
    name: 'Nombre del bot 1',
    description: 'Qué hace este bot, para qué sirve, en qué servidores se usa.',
    tags: ['discord.js', 'Node.js'],
    requiresAuth: true,
  },
];
