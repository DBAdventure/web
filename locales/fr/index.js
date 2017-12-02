import iview from 'iview/dist/locale/fr-FR';
import common from './common';
import objects from './objects';
import spells from './spells';

const translations = {};
Object.assign(translations, common);
Object.assign(translations, iview);
Object.assign(translations, objects);
Object.assign(translations, spells);

export default translations;
