<template>
    <div>
        <h1 class="title title-register">{{ $trans('register.text') }}</h1>
        <p>{{ $trans('register.welcome') }}</p>
        <p>{{ $trans('register.intro') }}</p>

        <form id="register-form" class="form-horizontal" method="post" @submit.prevent="register">
            <h2>{{ $trans('register.personalinfo') }}</h2>

            {{ form_row(form.name) }}
            {{ form_row(form.username) }}
            {{ form_row(form.password) }}
            {{ form_row(form.email) }}

            <h2>{{ $trans('register.speciality') }}</h2>
            <p>{{ $trans('register.speciality.intro') }}</p>

            {{ form_row(form.class) }}

            <div class="class-list class-list1">
                <div class="col-md-3 text-center">
                    <h3>{{ $trans('warrior') }}</h3>
                    <img src="/images/avatars/players/M7.png" :title="$trans('warrior')" :alt="$trans('warrior')"/>
                </div>
                <div class="col-md-9">
                    <p>{{ $trans('register.warrior.intro') }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dd>Efficace contre la plupart des classes</dd>
                        <dd>Fatigue atténuée</dd>
                        <dd>Capacité à supporter de lourds équipements et objets consommables</dd>
                        <dd>Défense</dd>

                        <dt>{{ 'register.weakness' | trans }}</dt>

                        <dd>Attaque contre les voleurs</dd>
                        <dd>Moins efficace dans les un contre un</dd>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>770 points de vie, 10 force, 9 précision, 5 résistance, 3 agilité</dd>
                    </dl>
                </div>
            </div>

            <div class="class-list class-list2 hide">
                <div class="col-md-3 text-center">
                    <h3>{{ 'magus' | trans }}</h3>
                    <img src="/images/avatars/players/HS24.png" :title="$trans('magus')" :alt="$trans('magus')"/>
                </div>
                <div class="col-md-9">
                    <p>{{ $trans('register.magus.intro') }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dd>Attaques magiques variées et puissantes</dd>
                        <dd>Capacité à toucher à distance</dd>

                        <dt>{{ 'register.weakness' | trans }}</dt>

                        <dd>Consomment plus d'énergie que les autres classes</dd>
                        <dd>Défense</dd>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>365 points de vie, 15 esprit, 3 analyse, 4 talent, 5 vision, 3 résistance, 15 de Ki + sort de base maîtrisé</dd>
                    </dl>
                </div>
            </div>

            <div class="class-list class-list3 hide">
                <div class="col-md-3 text-center">
                    <h3>{{ 'thief' | trans }}</h3>
                    <img src="/images/avatars/players/HS45.png" :title="$trans('thief')" :alt="$trans('thief')" />
                </div>
                <div class="col-md-9">
                    <p>{{ 'register.thief.intro' | trans }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dd>Capacité à voler pour réapprovisionner les troupes</dd>
                        <dd>Défense contre les guerriers</dd>
                        <dd>Infatigable lors de tentative de vols</dd>

                        <dt>{{ 'register.weakness' | trans }}</dt>

                        <dd>Puissance</dd>
                        <dd>Défense magique</dd>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>500 points de vie, 15 agilité, 11 précision,  5 force, 2 analyse</dd>
                    </dl>
                </div>
            </div>

            <div class="class-list class-list4 hide">
                <div class="col-md-3 text-center">
                    <h3>{{ 'healer' | trans }}</h3>
                    <img src="/images/avatars/players/N2.png" :title="$trans('healer')" :alt="$trans('healer')" />
                </div>
                <div class="col-md-9">
                    <p>{{ 'register.healer.intro' | trans }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dd>Excellent soutien en bataille</dd>
                        <dd>Défense magique</dd>

                        <dt>{{ 'register.weakness' | trans }}</dt>

                        <dd>Attaque</dd>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>500 points de vie, 17 talent, 7 esprit, 4 force et 9 de Ki</dd>
                    </dl>
                </div>
            </div>

            <div class="class-list class-list5 hide">
                <div class="col-md-3 text-center">
                    <h3>{{ 'analyst' | trans }}</h3>
                    <img src="/images/avatars/players/C16.png" :title="$trans('analyst')" :alt="$trans('analyst')" />
                </div>
                <div class="col-md-9">
                    <p>{{ 'register.analyst.intro' | trans }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dd>Classe furtive, vous ne laissez aucune trace de votre passage</dd>
                        <dd>Permet d'élaborer de multiples stratégies menant à la victoire</dd>
                        <dd>Défense générale</dd>
                        <dd>Soutien</dd>

                        <dt>{{ 'register.weakness' | trans }}</dt>

                        <dd>Attaque</dd>
                        <dd>Gestion très difficile</dd>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>500 points de vie, 15 analyse, 5 vision,  5 force, 3 agilité, 3 résistance et 4 précision</dd>
                    </dl>
                </div>
            </div>

            <div class="class-list class-list6 hide">
                <div class="col-md-3 text-center">
                    <h3>{{ 'ranger' | trans }}</h3>
                    <img src="/images/avatars/players/C16.png" :title="$trans('ranger')" :alt="$trans('ranger')" />
                </div>
                <div class="col-md-9">
                    <p>{{ 'register.ranger.intro' | trans }}</p>
                    <dl>
                        <dt>{{ $trans('register.advantages') }}</dt>
                        <dt>{{ 'register.weakness' | trans }}</dt>
                        <dt>{{ 'register.stats' | trans }}</dt>
                        <dd>500 points de vie, 15 vision, 4 agilité, 4 de précision, 6 force, 2 résistance et 4 en esprit</dd>
                    </dl>
                </div>
            </div>

            <h2>{{ 'register.speciality' | trans }}</h2>
            <div>
                <p>
                    A présent, choisis la race et l'apparence de ton personnage.
                </p>
                <div class="alert alert-warning" role="alert">
                    L'apparence de ton personnage n'a d'importance que pour la classe <strong>Mage</strong> car chaque race possède des sorts différents.
                    Fais donc bien attention au choix de la race de ton personnage si tu es mage.
                    Dans le cas contraire, choisis simplement l'apparence en fonction de tes goûts sans prendre en compte les descriptions des races.
                </div>
            </div>

            <div>
                <table class="table-apparence">
                    <tr>
                        <td align="center" width="75" height="75" background="{{ asset('/images/map/day/grass_0.png" >
                            <img class="perso-images" type="image" src="/images/avatars/players/S.png" border="0">
                        </td>
                        <td align="center" width="10" height="75"></td>
                        <td align="center" width="75" height="75" background="{{ asset('/images/map/day/sand_0.png" >
                            <img class="perso-images" type="image" src="/images/avatars/players/S.png" border="0">
                        </td>
                        <td align="center" width="10" height="75"></td>
                        <td align="center" width="75" height="75" background="{{ asset('/images/map/day/ground_0.png" >
                            <img class="perso-images" type="image" src="/images/avatars/players/S.png" border="0">
                        </td>
                    </tr>
                </table>
                <div>
                    {{ form_widget(form.race) }}
                    {{ form_widget(form.appearance.type) }}
                    {{ form_widget(form.appearance.image) }}
                </div>

                <div class="race-list race-list1">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'humans' | trans }}</h3>
                        <p>
                            {% for image in ['H2', 'H1', 'H5', 'H3', 'H'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('humans')" :alt="$trans('humans')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=1" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.humans.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Sorts spéciaux variés</dd>
                            <dd>Sort de défense et combinable avec les cyborgs</dd>
                            <dd>Soutien exceptionnel</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Derniers sorts trop classiques</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list2 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'human-saiyajins' | trans }}</h3>
                        <p>
                            {% for image in ['HS27', 'HS33', 'HS35', 'HS41', 'HS42'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('human-saiyajins')" :alt="$trans('human-saiyajins')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=2" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.human-saiyajins.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>3 sorts de transformation</dd>
                            <dd>Sorts spéciaux dévastateurs</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list3 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'namekians' | trans }}</h3>
                        <p>
                            {% for image in ['N', 'N3', 'N2', 'N8', 'N5'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('namekians')" :alt="$trans('namekians')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=3" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.namekians.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Economie des points de mouvements</dd>
                            <dd>Sorts spéciaux remarquables</dd>
                            <dd>Capable d'imiter d'autres classes</dd>
                            <dd>Sort ultime dévastateur</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list4 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'saiyajins' | trans }}</h3>
                        <p>
                            {% for image in ['S6', 'S24', 'S10', 'S18', 'S16'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('saiyajins')" :alt="$trans('saiyajins')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=4" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.saiyajins.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>4 sorts de transformation</dd>
                            <dd>Sorts mystérieux au potentiel caché</dd>
                            <dd>1 sort spécial</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list5 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'aliens' | trans }}</h3>
                        <p>
                            {% for image in ['A17', 'A20', 'A15', 'A14', 'A23'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('aliens')" :alt="$trans('aliens')" />
                            {% endfor %}
                            p          </p>
                            <p>
                                <a href="infos_race.php?race=5" target="_blank">Voir les sorts</a>
                            </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.aliens.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Sorts très variés et handicapant sérieusement l'adversaire</dd>
                            <dd>Défense</dd>
                            <dd>2 transformations</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list6 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'cyborgs' | trans }}</h3>
                        <p>
                            {% for image in ['C2', 'C3', 'C1', 'C4', 'C8'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('cyborgs')" :alt="$trans('cyborgs')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=6" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.cyborgs.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Défense</dd>
                            <dd>Soutien</dd>
                            <dd>Sorts spéciaux</dd>
                            <dd>Consommation de Ki fortement réduite</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Diversité des sorts</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list7 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'majins' | trans }}</h3>
                        <p>
                            {% for image in ['M9', 'M3', 'M2', 'M4', 'M10'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('majins')" :alt="$trans('majins')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=7" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.majins.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Potentiel offensif infini</dd>
                            <dd>Réssurection</dd>
                            <dd>Economie de points de mouvements</dd>
                            <dd>Soutien grâce au contrôle de Babidi</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Défense</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list8 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ 'dragons' | trans }}</h3>
                        <p>
                            {% for image in ['D4', 'D3', 'D13', 'D6', 'D8'] %}
                            <img src="/images/avatars/players/' ~ image ~ '.png" :title="$trans('dragons')" :alt="$trans('dragons')" />
                            {% endfor %}
                        </p>
                        <p>
                            <a href="infos_race.php?race=8" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ 'register.dragons.intro' | trans }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Un total de 13 sorts !</dd>
                            <dd>Sort de soutien protecteur</dd>
                            <dd>Sorts spéciaux nombreux, très puissants, variés et inégalables</dd>
                            <dd>Capable d'accroitre sa puissance grâce aux Dragon Ball</dd>
                            <dt>{{ 'register.weakness' | trans }}</dt>
                            <dd>Consommation de Ki la plus élevée de toutes les races</dd>
                        </dl>
                    </div>
                </div>

            </div>

            <div>
                <h2>{{ 'register.various' | trans }}</h2>
                {{ form_row(form.side) }}
                <div class="col-md-12">
                    <p>Afin de t'épauler un peu dès le début de l'aventure, tu auras à ta disposition ces objets ci-dessous dès ta première connexion au jeu :</p>
                    <ul>
                        <li>2 options de fatigue</li>
                        <li>1 senzu</li>
                        <li>5 baies sauvages</li>
                    </ul>
                </div>

                {{ form_widget(form._token) }}

                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default">{{ 'register.text' | trans }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
 export default {
     head: {
         title: 'Home',
     },
     data() {
         return {
         };
     },
 };
</script>
