<template>
    {% set action = constant((what | upper) ~ '_ACTION', app.user) %}
    <a href="{{ path('action.' ~ what, {"player_id": player.id}) }}">
        {% if player.side.id == constant('NPC', app.user.side) %}
        {% set player = app.user %}
        {% endif %}
        <img src="{{ player.getActionImagePath(what) }}" alt="{{ ('map.action.' ~ what) | trans({'%AP%': action}) }}" title="{{ ('map.action.' ~ what) | trans({'%AP%': action}) }}" />
    </a>
</template>


<script type="text/ecmascript-6">
 export default {
     middleware: 'auth',
     head: {
         title: 'Map',
     },
     components: {
     },
     data() {
         return {
         };
     },
 };
</script>
