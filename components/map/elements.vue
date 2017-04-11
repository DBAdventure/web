<template>
    <div>
        <a v-if="player.health < player.totalMaxHealth && player.actionPoints >= HEAL_ACTION"
           href="#" @click.prevent="heal(player.id)">
            <img
                :src="player.getActionImagePath('heal')"
                :alt="$trans('map.action.heal', {AP: HEAL_ACTION})"
                :title="$trans('map.action.heal', {AP: HEAL_ACTION})" />
        </a>
    </div>
</template>
