<template>
    <div>
        <h1 class="title title-home">{{ 'appearance' | trans }}</h1>

        <div class="events">
            <h2 class="subtitle text-center">
                {{ 'events.target' | trans }}
            </h2>
            {% set user = app.user %}
            <table class="table table-filter">
                <tbody>
                    {% for event in user.targetEvents | reverse | slice(0, 10) %}
                    <tr>
                        <td>
                            {{ helper.displayEvent(event, event.player) }}
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>

        <div class="events">
            <h2 class="subtitle text-center">
                {{ 'events.player' | trans }}
            </h2>
            <table class="table table-filter">
                <tbody>
                    {% for event in user.playerEvents | reverse | slice(0, 10) %}
                    <tr>
                        <td>
                            {{ helper.displayEvent(event, event.target, true) }}
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 export default {
     middleware: 'auth',
     head: {
         title: 'Account',
     },
     data() {
         return {
         };
     },
 };
</script>
