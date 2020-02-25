<template>
  <div class="rules">
    <h1 class="title title-rules">
      {{ $t('rules.title') }}
    </h1>
    <div class="top-summary">
      <div class="top-summary-menu">
        <dl class="list-dots">
          <dt>{{ $t('rules.chapter.1.title') }}</dt>
          <dd><a href="#site">{{ $t('rules.chapter.1.sections.site.title') }}</a></dd>
          <dd><a href="#game">{{ $t('rules.chapter.1.sections.game.title') }}</a></dd>
          <dt>{{ $t('rules.chapter.2.title') }}</dt>
          <dd><a href="#option">{{ $t('rules.chapter.2.sections.option.title') }}</a></dd>
          <dd><a href="#character">{{ $t('rules.chapter.2.sections.character.title') }}</a></dd>
          <dt>{{ $t('rules.chapter.3.title') }}</dt>
          <dd><a href="#map">{{ $t('rules.chapter.3.sections.map.title') }}</a></dd>
          <dd><a href="#building">{{ $t('rules.chapter.3.sections.building.title') }}</a></dd>
          <dt>{{ $t('rules.chapter.4.title') }}</dt>
          <dd><a href="#abbreviations">{{ $t('rules.chapter.4.sections.abbreviations.title') }}</a></dd>
          <dd><a href="#actions">{{ $t('rules.chapter.4.sections.actions.title') }}</a></dd>
          <dd><a href="#ranks">{{ $t('rules.chapter.4.sections.ranks.title') }}</a></dd>
          <dd><a href="#level">{{ $t('rules.chapter.4.sections.level.title') }}</a></dd>
        </dl>
      </div>
    </div>

    <section>
      <h1>{{ $t('rules.chapter.1.title') }}</h1>
      <h2><a name="site" />{{ $t('rules.chapter.1.sections.site.title') }}</h2>
      <p v-html="$t('rules.chapter.1.sections.site.text1')" />
      <p
        class="bad"
        v-html="$t('rules.chapter.1.sections.site.text2')"
      />

      <h2><a name="game" />{{ $t('rules.chapter.1.sections.game.title') }}</h2>
      <p v-html="$t('rules.chapter.1.sections.site.text1')" />
    </section>
    <section>
      <h1>{{ $t('rules.chapter.2.title') }}</h1>
      <h2><a name="option" />{{ $t('rules.chapter.2.sections.option.title') }}</h2>
      <p v-html="$t('rules.chapter.2.sections.option.text1')" />
      <ul class="list-dots">
        <li>{{ $t('rules.chapter.2.sections.option.text2') }}</li>
        <li>{{ $t('rules.chapter.2.sections.option.text3') }}</li>
        <li>{{ $t('rules.chapter.2.sections.option.text4') }}</li>
        <li>{{ $t('rules.chapter.2.sections.option.text5') }}</li>
      </ul>

      <h2><a name="character" />{{ $t('rules.chapter.2.sections.character.title') }}</h2>
      <p v-html="$t('rules.chapter.2.sections.character.text1')" />
      <p v-html="$t('rules.chapter.2.sections.character.text2')" />
    </section>
    <section>
      <h1>{{ $t('rules.chapter.3.title') }}</h1>
      <h2><a name="map" />{{ $t('rules.chapter.3.sections.map.title') }}</h2>
      <p v-html="$t('rules.chapter.3.sections.map.text1')" />
      <ul class="list-dots">
        <li v-html="$t('rules.chapter.3.sections.map.text2')" />
        <li v-html="$t('rules.chapter.3.sections.map.text3')" />
        <li v-html="$t('rules.chapter.3.sections.map.text4')" />
      </ul>
      <p v-html="$t('rules.chapter.3.sections.map.text5')" />

      <h2><a name="building" />{{ $t('rules.chapter.3.sections.building.title') }}</h2>
      <p v-html="$t('rules.chapter.3.sections.building.text1')" />
      <p v-html="$t('rules.chapter.3.sections.building.text2')" />
      <p v-html="$t('rules.chapter.3.sections.building.text3')" />
    </section>

    <section>
      <h1>{{ $t('rules.chapter.4.title') }}</h1>
      <h2><a name="abbreviations" />{{ $t('rules.chapter.4.sections.abbreviations.title') }}</h2>
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text1')" />
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text2')" />
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text3')" />
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text4')" />
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text5')" />
      <p v-html="$t('rules.chapter.4.sections.abbreviations.text6')" />

      <h2><a name="actions" />{{ $t('rules.chapter.4.sections.actions.title') }}</h2>
      <p v-html="$t('rules.chapter.4.sections.actions.text1')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text2')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text3')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text4')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text5')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text6')" />
      <p v-html="$t('rules.chapter.4.sections.actions.text7')" />

      <h2><a name="ranks" />{{ $t('rules.chapter.4.sections.ranks.title') }}</h2>
      <p v-html="$t('rules.chapter.4.sections.ranks.text1')" />

      <h2><a name="level" />{{ $t('rules.chapter.4.sections.level.title') }}</h2>
      <p v-html="$t('rules.chapter.4.sections.level.text1')" />
    </section>
  </div>
</template>

<script>
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
