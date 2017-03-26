<template>
    <div>
        <a v-if="player.health < player.totalMaxHealth and player.actionPoints >= constant('HEAL_ACTION', player)"
           href="{{ path('action.heal', {"player_id": player.id}) }}">
            <img
                src="{{ player.getActionImagePath('heal') }}"
                alt="{{ 'map.action.heal' | trans({'%AP%': constant('HEAL_ACTION', player)}) }}"
                title="{{ 'map.action.heal' | trans({'%AP%': constant('HEAL_ACTION', player)}) }}" />
        </a>

        {% if items.objects is defined %}
        {% for distance, objects in items.objects | distance %}
        {% for object in objects %}
        <div class="row row-object">
            <div class="col-lg-2 text-center">
                <img src="{{ object.mapObjectType.imagePath }}" alt="{{ object.mapObjectType.name | trans({}, 'objects') }}" />
            </div>
            <div class="col-lg-10">
                {{ object.mapObjectType.name | trans({}, 'objects') }}
                {% if distance == 0 %}
                {{ 'map.near.you' | trans }}
                {% else %}
                {{ 'map.distance' | trans({'%x%': object.x, '%y%': object.y, '%distance%': distance}) }}
                {% endif %}

                {% if distance == 0 %}
                <div class="actions">
                    <a href="{{ path('action.pickup', {"id" : object.id}) }}">
                        <img src="{{ player.getActionImagePath('pick-up') }}" alt="{{ 'map.action.pickup' | trans({'%AP%': constant('PICKUP_ACTION', player)}) }}" title="{{ 'map.action.pickup' | trans({'%AP%': constant('PICKUP_ACTION', player)}) }}" />
                    </a>
                </div>
                {% endif %}
            </div>
        </div>
        {% endfor %}
        {% endfor %}
        {% endif %}

        {% if items.buildings is defined %}
        {% for distance, buildings in items.buildings | distance %}
        {% for building in buildings %}
        <div class="row row-building">
            <div class="col-lg-2 text-center">
                <img src="{{ building.imagePath }}" alt="{{ building.name | trans({}, 'buildings') }}">
            </div>
            <div class="col-lg-10">
                {{ building.name | trans({}, 'buildings') }}
                {% if distance == 0 %}
                {{ 'map.near.you' | trans }}
                {% else %}
                {{ 'map.distance' | trans({'%x%': building.x, '%y%': building.y, '%distance%': distance}) }}
                {% endif %}

                {% if distance == 0 %}
                <div class="actions">
                    <a href="{{ path('building.enter', {"id" : building.id}) }}">
                        {% if building.type == 1 %}
                        {{ 'map.building.teleport' | trans }}
                        {% elseif building.type == 3 %}
                        {{ 'map.building.wanted' | trans }}
                        {% elseif building.type >=4 or building.type == 2 %}
                        {{ 'map.building.enter' | trans }}
                        {% endif %}
                    </a>
                </div>
                {% endif %}
            </div>
        </div>
        {% endfor %}
        {% endfor %}
        {% endif %}

        {% if items.players is not defined %}
        {{ 'map.no.one' | trans }}
        {% else %}
        {% for distance, players in items.players | distance %}
        {% for player in players if player.id != player.id %}
        <div class="row row-player">
            <div class="col-lg-2 text-center">
                <img src="{{ player.imagePath }}" alt="{{ player.displayName }}">
            </div>
            <div class="col-lg-10">
                <strong>
                    {% if player.isPlayer %}
                    <a data-ajax="false" href="{{ path('player.info', {"id": player.id}) }}">{{ player.displayName }}</a>
                    {% else %}
                    <strong>{{ player.displayName }}</strong>
                    {% endif %}
                </strong>
                {% if distance == 0 %}
                {{ 'map.player.near.you' | trans({"%level%": player.level}) }}
                {% else %}
                {{ 'map.player.distance' | trans({"%level%": player.level, "%x%": player.x, "%y%": player.y, "%distance%": distance}) }}
                {% endif %}

                <br/>
                {{ 'map.player.info' | trans({"%sideClass%": player.side.name, "%raceClass%": player.race.name, "%side%": (player.side.name | trans), "%race%": (player.race.name | trans), "%class%": (player.class | trans)}) | raw }}

                <div class="actions">
                    {% if player.isPlayer %}
                    <a data-ajax="false" href="{{ path('inbox.write.player', {"playerId": player.id})}}">
                        <img src="{{ player.actionImagePath('write') }}" alt="{{ 'inbox.write' | trans }}" title="{{ 'inbox.write' | trans }}"  />
                    </a>
                    {% endif %}

                    {% if distance == 0 %}
                    {% if player.isPlayer and player.betrayals > 0 and player.actionPoints >= constant('SLAP_ACTION', player) %}
                    {{ helper.actionLink(player, 'slap') }}
                    {% endif %}

                    {% if player.isPlayer and player.actionPoints >= constant('GIVE_ACTION', player) %}
                    {{ helper.actionLink(player, 'give') }}
                    {% endif %}

                    {% if player.actionPoints >= constant('ANALYSIS_ACTION', player) %}
                    {{ helper.actionLink(player, 'analysis') }}
                    {% endif %}

                    {% if player.actionPoints >= constant('STEAL_ACTION', player) and map[player.x][player.y]['bonus'] == constant('Dba\\GameBundle\\Entity\\MapBonus::TYPE_DEFAULT') %}
                    {{ helper.actionLink(player, 'steal') }}
                    {% endif %}

                    {% if player.actionPoints >= constant('HEAL_ACTION', player) and player.health < player.totalMaxHealth %}
                    {{ helper.actionLink(player, 'heal') }}
                    {% endif %}

                    {% if player.actionPoints >= constant('ATTACK_ACTION', player) and map[player.x][player.y]['bonus'] == constant('Dba\\GameBundle\\Entity\\MapBonus::TYPE_DEFAULT') %}
                    {% if player.side.id == player.side.id %}
                    <a href="{{ path('action.attack', {"player_id": player.id, "type": constant('ATTACK_TYPE_BETRAY', player)}) }}">
                        <img src="{{ player.getActionImagePath('attack-betray') }}" alt="{{ 'map.action.betray' | trans({'%AP%': constant('ATTACK_ACTION', player)}) }}" title="{{ 'map.action.betray' | trans({'%AP%': constant('ATTACK_ACTION', player)}) }}" />
                    </a>
                    {% else %}
                    {{ helper.actionLink(player, 'attack') }}
                    {% endif %}

                    {% if player.target.id is defined and player.target.id == player.id %}
                    <a href="{{ path('action.attack', {"player_id": player.id, "type": constant('ATTACK_TYPE_REVENGE', player)}) }}">
                        <img src="{{ player.getActionImagePath('attack-revenge') }}" alt="{{ 'map.action.revenge' | trans({'%AP%': constant('ATTACK_ACTION', player)}) }}" title="{{ 'map.action.revenge' | trans({'%AP%': constant('ATTACK_ACTION', player)}) }}"  />
                    </a>
                    {% endif %}
                    {% endif %}
                    {% endif %}

                    {% if player.actionPoints >= constant('SPELL_ACTION', player) %}
                    {{ helper.actionLink(player, 'spell') }}
                    {% endif %}
                </div>
            </div>
        </div>
    </div>
</template>
