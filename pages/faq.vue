<template>
    <div class="faq">
        <h1 class="title title-faq">{{ $trans('menu.faq') }}</h1>

        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading1">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse1" aria-expanded="true" aria-controls="questionCollapse1">
                            Le jeu est il payant ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="questionHeading1">
                    <div class="panel-body">
                        Non c'est un jeu gratuit ouvert a tous.
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading2">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse2" aria-expanded="true" aria-controls="questionCollapse2">
                            Quel logiciel utiliser ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading2">
                    <div class="panel-body">
                        Vous avez seulement besoin de votre navigateur web.
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading3">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse3" aria-expanded="true" aria-controls="questionCollapse3">
                            C'est quoi un PA ? PM ? Et le ki ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading3">
                    <div class="panel-body">
                        Un PA est un point d'action, vous en gagnez un toutes les demi heures, pas besoin d'être connecté pour en gagner, ceux-ci vous permettront de faire toutes les actions possibles du jeu.
                        Un PM est un point de mouvement, vous engagnez aussi toutes les demis heures.
                        Quant au Ki ce sont en quelque sorte les point de pouvoirs, magie si vous préférez.
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading4">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse5" aria-expanded="true" aria-controls="questionCollapse5">
                            Je suis mort et il devait y avoir X PA et j'en ai reçu moins pourquoi?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading4">
                    <div class="panel-body">
                        A chaque fois que vous mourez vous perdez 30 % des PA que vous possédiez juste avant votre mort.
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading5">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse6" aria-expanded="true" aria-controls="questionCollapse6">
                            Pourquoi je ne peux pas attaquer un ennemi ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading5">
                    <div class="panel-body">
                        Pour l'attaquer il vous faut 5 PA, ainsi qu'être sur sa case, vous ne pouvez pas attaquer quelqu'un de votre camp, quelle que soit sa race, son côté, ou même sa classe.
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading6">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse7" aria-expanded="true" aria-controls="questionCollapse7">
                            Quelqu'un me demande mon mot de passe dois-je lui donner ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading6">
                    <div class="panel-body">
                        Nous n'avons nullement besoin de votre mot de passe, si une personne vous le demande rapportez directement son nom, par messagerie ou sur le forum nous nous ferons un plaisirde lui donner une correction (fouet ou autre selon envie), enfin bref : <strong>Aucun membre de l'équipe de vous demandera votre mot de passe.</strong>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="questionHeading7">
                    <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questionCollapse8" aria-expanded="true" aria-controls="questionCollapse8">
                            Si je trahis un copain que se passe t il ? Et si je le tue ?
                        </a>
                    </h4>
                </div>
                <div id="questionCollapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="questionHeading7">
                    <div class="panel-body">
                        Si vous l'attaquez juste une fois vous augmenterez vos points de trahison de un, plus vous attaquerez de copain, plus vous augmenterez en trahison.
                        Si vous le tuez, vous changerez de côté, et vous perdrez tout vos points de côté. De plus celui ci aura la possibilité de se venger.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 export default {
     head: {
         title: 'F.A.Q',
     },
     data() {
         return {
         };
     },
 };
</script>
