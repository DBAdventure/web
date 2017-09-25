<template>
    <div class="rules">
        <h1 class="title title-rules">{{ $t('rules.title') }}</h1>
        <div class="top-summary">
            <div class="top-summary-menu">
                <dl class="list-dots">
                    <dt>Chapitre I</dt>
                    <dd><a href="#site">Le site</a></dd>
                    <dd><a href="#jeu">Le jeu</a></dd>
                    <dt>Chapitre II</dt>
                    <dd><a href="#option">Option du personnage</a></dd>
                    <dd><a href="#perso">Personnages</a></dd>
                    <dt>Chapitre III</dt>
                    <dd><a href="#carte">Carte</a></dd>
                    <dd><a href="#batiment">Batiment</a></dd>
                    <dt>Chapitre IV</dt>
                    <dd><a href="#abrev">Les Pa, Bp, Pc, Pv et Z</a></dd>
                    <dd><a href="#actions">Les Actions</a></dd>
                    <dd><a href="#rang">Les Rangs</a></dd>
                    <dd><a href="#changniv">Changement de niveau</a></dd>
                </dl>
            </div>
        </div>

        <section>
            <h1>Chapitre I</h1>
            <h2><a name="website"></a>Le site:</h2>
            <p>
                DBAdventure, est un jeu de rôle. Tours par tours,
                tu gagnes des PA, un toutes les demi-heures, le maximun
                est de 60. Au délà de cette limite tu ne
                gagnes plus rien. Comme tu le sais, sur chaque jeu il
                y a des règles, nous te demandons de bien les respecter, sinon tu verras ton
                personnage ou tes personnages supprimé(s).
                Bon jeu.
                L'équipe.
            </p>
            <p class="bad">
                Le multicompte  est interdit sous peine de
                suppression de tous les personnages du joueur.
            </p>
            <h2><a name="game"></a>Le jeu:</h2>
            <p>
                DBAdventure est un jeu massivement multijoueur gratuit qui
                n'a besoin que d'un navigateur web pour marcher.
                Pénétre les terres créées par
                l'infâme pilaf, choisis un camp ainsi qu'une
                race. Tu pourras être gentil, méchant, un
                Humain, un Namek, un Saïyen, un Humain-Saïyen,
                un Alien, un Cyborg, un Dragon, ou encore un Malduchi.
            </p>
        </section>
        <section>
            <h1>Chapitre II</h1>
            <h2><a name="option"></a>Option du personnage :</h2>
            <p>
                Une fois inscrit, tu auras le droit de modifier les informations
                que tu auras saisies.
                En cliquant sur le lien (<span class="lien_menu">
                Informations</span>) tu pourras modifier les paramètres suivants :
            </p>
            <ul>
                <li>Mot de passe</li>
                <li>Histoire</li>
                <li>Email</li>
                <li>Supprimer ton compte</li>
            </ul>

            <h2><a name="perso"></a>Personnage:</h2>
            <p>
                Un personnage est gentil ou méchant, aucune différence,
                tu es juste prêt à disposer d'un
                camp. Cela peut changer par la suite, on peut passer de
                gentil en méchant en tuant un gentil et inversement
                pour les méchants.
            </p>
            <p>
                Apparence : un personnage peut aussi choisir sa race ;
                Un Humain, un Namek, un Saïyen, un Humain-Saïyen,
                un Alien, un Cyborg, un Dragon, ou encore un Malduchi.   La race sert en premier lieu pour les sorts des mages, puis pour l'apparence. Chaque races a ses sorts et ses apparences.
                - Option : certaines options du personnage peuvent être
                changées ensuite sur le lien (<span class="lien_menu">
                Informations</span>; voir
                sujet précedent).
            </p>
        </section>
        <section>
            <h1>Chapitre III</h1>
            <h2><a name="carte"></a>Carte:</h2>
            <p>
                La carte se trouve dans le menu "Ton personnage". Elle
                est très grande. Bien sûr, tu n'en
                vois qu'une petite partie qui représente l'endroit
                où tu te situes. Tu es le personnage
                au milieu de la carte. Sur la carte, apparaissent plusieurs
                choses :
            </p>
            <ul>
                <li>Le type de terrain : la terre (en vert), le désert
                    (en jaune), ces terrains n'affectent en rien tes déplacement,
                    et il y a aussi l'eau (en bleu), qui délimite la
                    carte et qui est infranchissable...</li>
                <li>Les joueurs : tu peux voir tous les joueurs à
                    proximité (quand il y a trop de joueurs sur une case,
                    un gros paquet de perso est representé) et si tu
                    es sur la même case que certains, tu peux
                    les attaquer.</li>
                <li>Les bâtiments : Magasin, bâtiment de tête
                    à prix.</li>
            </ul>

            <p>
                Respawns : quand un personnage est créé ou qu'il
                meurt, il apparaît dans son respawn. Il y a deux respawns :
                le paradis et l'enfer. Dans le respawn, on ne peut
                rien faire à part se déplacer. Pour agir, il faut aller sur le champ de bataille, et
                pour y aller, des téléporteurs sont placés
                dans les respawns.
            </p>
            <h2><a name="batiment"></a>Bâtiment: </h2>
            <p>
                Magasin : bâtiment où l'on achète les
                objets du jeu (l'argent dépensé au magasin
                est reversé sur la carte).
            </p>
            <p>
                Tête à prix : bâtiment où l'on
                peut mettre les têtes à prix.
            </p>
            <p>
                Téléporteur : permet d'aller du respawn au
                champ de bataille.
            </p>
            <p>
                QG : bâtiment des guildes.
            </p>
        </section>

        <section>
            <h1>Chapitre IV</h1>
            <h2><a name="abrev"></a>Les Pa, Bp, Pc, Pv et Z :</h2>
            <p>
                Les Pa : les Pa sont les points de déplacement. On
                gagne un point toutes les 30 minutes et on peut avoir une
                réserve de 60 Pa.
            </p>
            <p>
                Les Bp : Quand on "attaque", "soigne"
                ou "vole", on gagne des Bp. Les Bp sont les points
                qui font monter ta barre d'expérience (dans la rubrique
                Statistiques du personnage).
                Tu gagnes plus ou moins de Bp.
            </p>
            <p>
                Les Pc : ce sont les points qui servent dans la rubrique
                compétence. Ces points permettent d'augmenter ta
                vie, ton ki, ta force, ta résistance, ta précision,
                ton agilité, ta vision, ton analyse et ton talent.
                Ces points sont gagnés seulement quand tu passes
                le level.
            </p>
            <p>
                Les Pdc : les points de côtés, signifient que
                tu es le meilleur des gentils ou des méchants,
                ceux-là augmentent en fonction de ton nombre de
                frags et grâce à cela tu obtiens un rang.
            </p>
            <p>
                Les Pv : Les pv sont les points de vie.
            </p>
            <p>
                Les Z : les zénies constituent l'argent du jeu.
            </p>

            <h2><a name="actions"></a>Les Actions :</h2>

            <p>
                Déplacement : (Pm : les points de mouvement) on peut se déplacer en haut,
                en bas, à gauche, à droite, cette action coûte
                6Pm, on peut aussi se déplacer en diagonale, cette
                action coûte 7Pm. La réserve totale de Pms est de 100 unités.
            </p>
            <p>
                Lancer un sort : Permet de lancer un sort sur un adversaire ou un allié. Le lancer coute 6 Pas et consomme du Ki.
            </p>
            <p>
                Attaque : l'attaque coûte 5 Pa, on enlève
                des Pv à l'adversaire et on gagne des Bp. On peut
                rater son coup, faire un coup normal, un joli coup, un coup
                critique ou un coup de maître. L'adversaire peut aussi
                esquiver le coup, là on gagne 0 Bp. La commande &laquo;
                attaquer ce membre de la guilde &raquo; nous permet de ne
                pas basculer dans le camp adverse même si on tue
                un joueur du même camp que soi et donc de ne pas
                perdre ses points de cotés. (Voir chapitre II, 2)
            </p>
            <p>
                Soins : action qui coûte 4Pa, on donne des Pv et
                on gagne des Bp. On peut aussi louper son soin et de ce
                fait, ne rien gagner.
            </p>
            <p>
                Vol : action qui coûte 3 Pa, et sert à voler
                des zénies et grâce a cela, gagner des Bp.
            </p>
            <p>
                Ramasser des zénies : action qui coûte
                1 Pa, et sert à ramasser le zénies  ou autres objets sur la carte.
            </p>
            <p>
                Torgnole : elle ne coûte pas de Pa, inflige 1 de
                dégât et enlève 1 point de trahison.
                C'est pour les cas de vengeance.
            </p>

            <h2><a name="rang"></a>Les Rangs : </h2>
            <p>
                Les rangs varient selon les races, 11 rangs par race, un
                total de 88 rangs. Ceux ci sont calculés,par rapport
                au plus grand ou plus petit nombre de points de côtés
                selon la race.
                Exemple :
                Rogert a 50 points de côtés, le maximun est
                Bebert qui en a 100.
                Pourcentage = (50*100)/100 donc 50%.
                A partir de ce pourcentage, tu as par exemple
                le rang est Super saïyen si tu es Saïyen.
            </p>
            <p>Liste des rangs : (le 11ème étant le meilleur)</p>

            <h2><a name="changniv"></a>Passage de niveau :</h2>
            <p>
                Pour passer de niveau rien de plus simple suffit d'attaquer
                quelqu'un, de soigner ou voler.
            </p>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        head() {
            return {
                title: this.$t('rules.title'),
            };
        },
        data() {
            return {
            };
        },
    };
</script>
