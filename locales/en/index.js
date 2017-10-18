import buildings from './buildings';
import common from './common';
import iview from './iview';
import objects from './objects';
import spells from './spells';

const translations = {};
Object.assign(translations, buildings);
Object.assign(translations, common);
Object.assign(translations, iview);
Object.assign(translations, objects);
Object.assign(translations, spells);

export default translations;
