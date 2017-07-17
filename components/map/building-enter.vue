<template>
    <div>
        <template v-if="type === 'teleport'">
            <template v-for="move in availableMoves" v-if="me.forbidden_teleport !== move">
                <a href="#" @click.prevent="runAction('teleport', {where: move, id: building.id})">
                    {{ $t('game.teleport.link', {where: $t(`game.teleport.where.${move}`)}) }}
                </a>
                <br>
            </template>
        </template>

        <template v-if="type === 'shop'">
            <div class="text-left" v-html="$t('game.shop.text', {player: me.name, name: $t(`buildings.${building.name}`) })"></div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>{{ $t('image') }}</th>
                        <th>{{ $t('price') }}</th>
                        <th>{{ $t('weight') }}</th>
                        <th>{{ $t('name') }}</th>
                        <th>{{ $t('description') }}</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="object in objects">
                        <td><img :src="object.imagePath" :alt="$t(`${object.name}.name`)"></td>
                        <td>{{ object.price }}</td>
                        <td>{{ object.weight }}</td>
                        <td>{{ $t(`objects.${object.name}.name`) }}</td>
                        <td>{{ $t(`objects.${object.name}.description`) }}
                            <stats :data="object.bonus" v-if="object.bonus" />
                        </td>
                        <td><a class="btn btn-default" href="#" @click.prevent="buy(building.id, object.id)">{{ $t('building.shop.buy') }}</a></td>
                    </tr>
                </tbody>
            </table>
        </template>

        <template v-if="type === 'wanted'">
            <div class="text-left" v-html="$t('game.wanted.text', {player: me.name, name: building.name, minimalAmount: objects.minimalAmount})"></div>

            {% if me.zeni < objects.minimalAmount %}
            <p>{{ 'game.wanted.not.enough.zeni' | trans }}</p>
            {% else %}
            <form class="form-inline" method="post" action="{{ path('building.wanted', {"building_id": building.id}) }}">
                <div class="form-group">
                    <label for="amount">{{ 'game.wanted.amount' | trans }}</label>
                    <input type="text" class="form-control" id="amount" placeholder="0" name="amount">
                </div>
                <div class="form-group">
                    <label for="amount">{{ 'game.wanted.target' | trans }}</label>
                    <input type="text" class="form-control" id="target" name="target">
                </div>
                <button type="submit" name="Submit" class="btn btn-default">{{ 'form.wanted.setprice' | trans }}</button>
            </form>
            {% endif %}
        </template>

        <template v-if="type === 'bank'">
            {% set goldBar = objects.zeni is defined ? objects.zeni : 0 %}
            <div class="text-left">{{ 'game.bank.text' | trans({"%player%": me.name, "%name%": building.name, "%goldBar%": goldBar }) | raw }}</div>

            <p>{{ 'game.bank.deposit' | trans | raw }}</p>
            <form class="form-inline" method="post" action="{{ path('building.bank.deposit', {"building_id": building.id}) }}">
                <div class="form-group">
                    <input class="form-control" placeholder="0" type="text" name="deposit"/>
                </div>
                <button type="submit" name="Submit" class="btn btn-default">{{ 'form.bank.deposit' | trans }}</button>
            </form>

            <p>{{ 'game.bank.withdraw' | trans | raw }}</p>
            <form class="form-inline" method="post" action="{{ path('building.bank.withdraw', {"building_id": building.id}) }}">
                <div class="form-group">
                    <input class="form-control" placeholder="0" type="text" name="withdraw"/>
                </div>
                <button type="submit" name="Submit" class="btn btn-default">{{ 'form.bank.withdraw' | trans }}</button>
            </form>
        </template>

        <template v-if="type ==='magic'">
            <div class="text-left">{{ 'game.magic.text' | trans({"%player%": me.name, "%name%": building.name }) | raw }}</div>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>{{ 'price' | trans }}</th>
                        <th>{{ 'requirements' | trans }}</th>
                        <th>{{ 'name' | trans }}</th>
                        <th>{{ 'description' | trans }}</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {% for object in objects %}
                    <tr>
                        <td>{{ object.price }}</td>
                        <td>{{ helper.displayRequirements(object) }}</td>
                        <td>{{ $t(`$t{object.name}.name`) }}</td>
                        <td>{{ $t(`$t{object.name}.description`) }}{{ helper.displayBonus(object) | raw }}</td>
                        <td>
                            {% if me.hasSpell(object) %}
                            {{ 'building.shop.already.purchased.spell' | trans }}
                            {% elseif object.price > me.zeni %}
                            {{ 'building.shop.no.zeni' | trans}}
                            {% else %}
                            <a class="btn btn-default" href="{{ path('building.spell.buy', {"building_id": building.id, "spell_id": object.id})}}">{{ 'building.shop.buy' | trans }}</a>
                            {% endif %}
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import Stats from '~/components/objects/stats';

    export default {
        components: {
            Stats,
        },
        props: {
            building: {
                type: Object,
                required: true,
            },
            objects: {
                type: Object,
                required: false,
            },
            me: {
                type: Object,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                availableMoves: ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'],
            };
        },
    };
</script>
