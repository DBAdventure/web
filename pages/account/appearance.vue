<template>
    <dvi>
        <h1 class="title title-appearance">{{ 'appearance' | trans }}</h1>

        {% set user = app.user %}
        <div class="container-fluid">
            <form id="appearance-form" class="form-horizontal" method="post" action="{{ path('account.appearance') }}">
                <div class="form-group">
                    <table class="table-apparence">
                        <tr>
                            <td class="text-center" width="100" height="100" background="{{ asset('/bundles/dbagame/images/map/day/grass_0.png') }}" >
                                <img class="perso-images" type="image" src="{{ asset(user.imagePath) }}" border="0">
                            </td>
                            <td class="text-center" width="10" height="100"></td>
                            <td class="text-center" width="100" height="100" background="{{ asset('/bundles/dbagame/images/map/day/sand_0.png') }}" >
                                <img class="perso-images" type="image" src="{{ asset(user.imagePath) }}" border="0">
                            </td>
                            <td class="text-center" width="10" height="100"></td>
                            <td class="text-center" width="100" height="100" background="{{ asset('/bundles/dbagame/images/map/day/ground_0.png') }}" >
                                <img class="perso-images" type="image" src="{{ asset(user.imagePath) }}" border="0">
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="form-group">
                    <input type="hidden" name="player_registration_race" id="player_registration_race" value="{{ user.race.id }}"/>
                    {{ form_widget(form.type) }}
                    {{ form_widget(form.image) }}
                </div>

                {{ form_widget(form._token) }}

                <div class="form-group">
                    <div class="text-center">
                        <button type="submit" class="btn btn-default">{{ 'save' | trans }}</button>
                    </div>
                </div>
            </form>
        </div>
    </dvi>
</template>

<script type="text/ecmascript-6">
 export default {
     head: {
         title: 'Home',
     },
     data() {
         return {
             newsList: [],
             nbObjects: 0,
             nbBuildings: 0,
             nbActivePlayers: 0,
             nbActiveNpc: 0,
             nbGuilds: 0,
         };
     },
 };
</script>
