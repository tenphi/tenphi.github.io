<template>
  <nu-block id="app">
    <nu-props radius="2x"></nu-props>
    <nu-theme :hue="hue"></nu-theme>
    <nu-props move-transition-time=".25s" opacity-transition-time=".25s"></nu-props>
    <nu-section
      theme="special"
      border="2x inside hue(0 0 0 40%)|||1x inside hue(0 0 0 40%)"
      :image="gradient"
      height="40 100vh initial" box="y">

      <nu-flex
        place="inside" flow="column" gap="3x"
        color="white" items="center" text="center">
        <nu-circle box="y" size="14" fill=" hue(0 0 0 70%)" padding border="0">
          <nu-circle place="inside" size="12" overflow="no" shadow="special" border="0">
            <nu-img>
              <img alt="Photo" src="./assets/tenphi_photo.jpg"/>
            </nu-img>
          </nu-circle>
        </nu-circle>
        <nu-flow gap size="lg">
          <nu-h1
            size="xl" text="b"
            nx-appear="timeout(10)" transition="opacity, move" opacity="0 :appear[1]" move="0 1x :appear[0 0]">
            Andrey Yamanov
          </nu-h1>
          <nu-block
            nx-appear="timeout(250)" transition="opacity, move" opacity="0 :appear[1]" move="0 1x :appear[0 0]">
            CSS Cheater, UX&nbsp;Advocate
          </nu-block>
        </nu-flow>
        <nu-menu
          label="Social links"
          flow="row" size="xl" gap="2x" content="center"
          nx-appear="timeout(500)" transition="opacity, move" opacity="0 :appear[1]" move="0 3x :appear[0 0]">
          <nu-attrs for="menuitem" padding radius clear
          nx-offset transition="move :offset[no]" move="(--offset-x * 1x) (--offset-y * 1x)"></nu-attrs>
          <nu-menuitem to="!https://github.com/tenphi" label="Github">
            <nu-icon name="github"></nu-icon>
          </nu-menuitem>
          <nu-menuitem to="!https://twitter.com/tenphi" label="Twitter">
            <nu-icon name="twitter"></nu-icon>
          </nu-menuitem>
          <nu-menuitem to="!https://facebook.com/tenphi" label="Facebook">
            <nu-icon name="facebook"></nu-icon>
          </nu-menuitem>
          <nu-menuitem to="mailto:tenphi@gmail.com" label="Email">
            <nu-icon name="email"></nu-icon>
          </nu-menuitem>
        </nu-menu>
      </nu-flex>

      <nu-menu
        flow="row" gap label="Theme settings"
        place="top 4x" padding size="lg" radius="2.5x" fill="hue(0 0 0 5% special)"
        nx-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]" move="0 -6x :appear[0 0]">
        <nu-attrs for="menuitem" clear padding radius mark="hover hue(0 0 0 10% special)"></nu-attrs>
        <nu-attrs for="tooltip" text="nowrap"></nu-attrs>
        <nu-menuitem
          id="scheme" toggle label="Change hue"
          value="dark" off-value="light">
          <nu-icon name="color-palette"></nu-icon>
          <nu-popup width="10" padding="2x" radius="round">
            <nu-attrs for="slider-cap" :border="`!1sw hue(${hue} 100 high special)`"></nu-attrs>
            <nu-slider
              id="hue"
              :value="hue"
              min="0" max="359"
              @input="hue = $event.detail"
              image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))">
            </nu-slider>
          </nu-popup>
          <nu-tooltip>Change hue</nu-tooltip>
        </nu-menuitem>
        <nu-menuitem
          id="scheme" toggle label="Scheme"
          control=":root[data-nu-scheme]" value="dark" off-value="light">
          <nu-icon name="moon"></nu-icon>
          <nu-tooltip>Change scheme</nu-tooltip>
        </nu-menuitem>
        <nu-menuitem
          id="contrast" toggle label="Contrast mode"
          control=":root[data-nu-contrast]" value="high" off-value="low">
          <nu-icon name="eye"></nu-icon>
          <nu-tooltip>Change contrast</nu-tooltip>
        </nu-menuitem>
      </nu-menu>

      <nu-pane
        place="bottom 4x" radius fill="hue(0 0 0 5% special)" padding="1x 2x" text="nowrap"
        nx-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]" move="0 6x :appear[0 0]">
        <nu-el>made with <nu-link to="!https://numl.design/">numl</nu-link></nu-el>
        <nu-line orient="v" fill="white"></nu-line>
        <nu-el>view <nu-link to="!https://github.com/tenphi/tenphi.me">source code</nu-link></nu-el>
      </nu-pane>
    </nu-section>
<!--    <router-view/>-->
  </nu-block>
</template>

<script>
import Settings from './services/settings';

export default {
  name: 'App',
  data() {
    return {
      hue: Settings.get('hue'),
    };
  },
  watch: {
    hue(val) {
      Settings.set('hue', val);
    },
  },
  computed: {
    gradient() {
      const { hue } = this;

      function grad(angle, step) {
        return `linear(${angle}deg, hue(${(hue + 360 - step) % 360} 65 special), hue(${(hue + step) % 360} 65 special))`
      }

      return `${grad(-15, 30)}||${grad(-40, 15)}`;
    },
  },
}
</script>
