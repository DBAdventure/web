<template>
    <div class="faq">
        <h1 class="title title-faq">{{ $t('menu.faq') }}</h1>

        <bs-accordion >
            <bs-panel is-open header="Le jeu est il payant ?">
                Non c'est un jeu gratuit ouvert a tous.
            </bs-panel>

            <bs-panel header="Quel logiciel utiliser ?">
                Vous avez seulement besoin de votre navigateur web.
            </bs-panel>

            <bs-panel header="C'est quoi un PA ? PM ? Et le ki ?">
                Un PA est un point d'action, vous en gagnez un toutes les demi heures, pas besoin d'être connecté pour en gagner, ceux-ci vous permettront de faire toutes les actions possibles du jeu.
                Un PM est un point de mouvement, vous engagnez aussi toutes les demis heures.
                Quant au Ki ce sont en quelque sorte les point de pouvoirs, magie si vous préférez.
            </bs-panel>

            <bs-panel header="Je suis mort et il devait y avoir X PA et j'en ai reçu moins pourquoi?">
                A chaque fois que vous mourez vous perdez 30 % des PA que vous possédiez juste avant votre mort.
            </bs-panel>

            <bs-panel header="Pourquoi je ne peux pas attaquer un ennemi ?">
                Pour l'attaquer il vous faut 5 PA, ainsi qu'être sur sa case, vous ne pouvez pas attaquer quelqu'un de votre camp, quelle que soit sa race, son côté, ou même sa classe.
            </bs-panel>

            <bs-panel header="Quelqu'un me demande mon mot de passe dois-je lui donner ?">
                Nous n'avons nullement besoin de votre mot de passe, si une personne vous le demande rapportez directement son nom, par messagerie ou sur le forum nous nous ferons un plaisirde lui donner une correction (fouet ou autre selon envie), enfin bref : <strong>Aucun membre de l'équipe de vous demandera votre mot de passe.</strong>
            </bs-panel>

            <bs-panel header="Si je trahis un copain que se passe t il ? Et si je le tue ?">
                Si vous l'attaquez juste une fois vous augmenterez vos points de trahison de un, plus vous attaquerez de copain, plus vous augmenterez en trahison.
                Si vous le tuez, vous changerez de côté, et vous perdrez tout vos points de côté. De plus celui ci aura la possibilité de se venger.
            </bs-panel>
        </bs-accordion>
    </div>
</template>

<script type="text/ecmascript-6">
import BsAccordion from '~components/bootstrap/accordion.vue';
import BsPanel from '~components/bootstrap/panel.vue';

export default {
    components: {
        BsAccordion,
        BsPanel,
    },
    head: {
        title: 'F.A.Q',
    },
};
</script>
