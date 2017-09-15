<template>
    <div>
        <h1 class="title title-default">{{ app.user.guildPlayer.guild.name }}</h1>

        <ul>
            <li>
                <a href="#">{{ 'guild.admin.menu.requester' | trans }}</a>
            </li>
            <li>
                <a href="#">{{ 'guild.admin.menu.fired' | trans }}</a>
            </li>

            {% if app.user.guildPlayer.rank.admin %}
            <li>
                <a href="#">{{ 'guild.admin.menu.rank' | trans }}</a>
            </li>
            <li>
                <a href="#">{{ 'guild.admin.menu.general' | trans }}</a>
            </li>
            {% endif %}
        </ul>


        <!-- Fired -->
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th>{{ 'name' | trans }}</th>
                    <th>{{ 'level' | trans }}</th>
                    <th>{{ 'guild.rank' | trans }}</th>
                    <th>{{ 'guild.stats.location' | trans }}</th>
                    <th>{{ 'guild.action' | trans }}</th>
                </tr>
            </thead>
            <tbody>
                {% for guildPlayer in guildPlayers %}
                <tr>
                    <td>
                        <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="guildPlayer.player.getImagePath()" /></router-link>
                    </td>
                    <td>{{ guildPlayer.player.level }}</td>
                    <td>{{ guildPlayer.rank.name }}</td>
                    <td>{{ guildPlayer.player.map.name | trans }} ( {{ guildPlayer.player.x }} / {{ guildPlayer.player.y }} )</td>
                    <td>
                        <!-- <a href="{{ path('guild.admin.fired', {"id": guildPlayer.id}) }}">{{ 'guild.admin.player.fired' | trans }}</a> -->
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>

        <!-- Requester -->
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th>{{ 'name' | trans }}</th>
                    <th>{{ 'level' | trans }}</th>
                    <th>{{ 'guild.stats.location' | trans }}</th>
                    <th>{{ 'guild.action' | trans }}</th>
                </tr>
            </thead>
            <tbody>
                {% for guildPlayer in guildPlayers %}
                <tr>
                    <td>
                        <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="guildPlayer.player.getImagePath()" /></router-link>
                    </td>
                    <td>{{ guildPlayer.player.level }}</td>
                    <td>{{ guildPlayer.player.map.name | trans }} ( {{ guildPlayer.player.x }} / {{ guildPlayer.player.y }} )</td>
                    <td>
                        <!-- <a href="{{ path('guild.admin.requester.decision', {"id": guildPlayer.id, "decision": "accept"}) }}">{{ 'guild.admin.player.request.accept' | trans }}</a>
                             <a href="{{ path('guild.admin.requester.decision', {"id": guildPlayer.id, "decision": "decline"}) }}">{{ 'guild.admin.player.request.decline' | trans }}</a> -->
                    </td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
</template>
