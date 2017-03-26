<template>
    <div class="account">
        {% set user = app.user %}
        <h1 class="title title-training-room">{{ 'training.room' | trans}}</h1>

        <div class="text-center">
            <img src="{{ asset(user.imagePath) }}"/>
            <p>
                {{ 'training.text' | trans | raw }}
            </p>
        </div>
        <div class="text-left">
            <p>{{ 'training.you.have' | trans }}</p>
            <ul>
                <li>{{ 'training.you.skill' | trans({"%skillPoints%": user.skillPoints}) }}</li>
                <li>{{ 'training.you.action' | trans({"%actionPoints%": user.actionPoints}) }}</li>
            </ul>

            {{ 'training.info' | trans }}
        </div>

        <table class="table table-hover">
            <tbody>
                <tr>
                    <td>
                        {{ 'training.health.title' | trans({"%value%": user.maxHealth}) }}<br/>
                        {{ 'training.health.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'health', 'training.health.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.ki.title' | trans({"%value%": user.maxKi}) }}<br/>
                        {{ 'training.ki.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'ki', 'training.ki.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.strength.title' | trans({"%value%": user.strength}) }}<br/>
                        {{ 'training.strength.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'strength', 'training.strength.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.resistance.title' | trans({"%value%": user.resistance}) }}<br/>
                        {{ 'training.resistance.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'resistance', 'training.resistance.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.accuracy.title' | trans({"%value%": user.accuracy}) }}<br/>
                        {{ 'training.accuracy.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'accuracy', 'training.accuracy.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.agility.title' | trans({"%value%": user.agility}) }}<br/>
                        {{ 'training.agility.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'agility', 'training.agility.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.vision.title' | trans({"%value%": user.vision}) }}<br/>
                        {{ 'training.vision.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'vision', 'training.vision.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.intellect.title' | trans({"%value%": user.intellect}) }}<br/>
                        {{ 'training.intellect.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'intellect', 'training.intellect.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.analysis.title' | trans({"%value%": user.analysis}) }}<br/>
                        {{ 'training.analysis.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'analysis', 'training.analysis.increase') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 'training.skill.title' | trans({"%value%": user.skill}) }}<br/>
                        {{ 'training.skill.description' | trans }}
                    </td>
                    <td>
                        {{ helper.increaseSkill(user, 'skill', 'training.skill.increase') }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
