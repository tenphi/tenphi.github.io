<template>
  <nu-block id="app">
    <nu-props radius="2x"></nu-props>
    <nu-theme :hue="hue"></nu-theme>
    <nu-attrs for="menuitem" color="white"></nu-attrs>
    <nu-attrs for="btn" color="white"></nu-attrs>
    <nu-attrs for="link" color="white"></nu-attrs>
    <nu-props move-transition-time=".25s" opacity-transition-time=".25s"></nu-props>
    <nu-block
      theme="special"
      border="2x inside hue(0 0 0 40%)|||1x inside hue(0 0 0 40%)"
      :image="gradient"
      height="40 100vh initial" box="y" color="white">

      <nu-article
        display="flex"
        place="inside" flow="column" gap="3x"
        color="white" items="center" text="center">
        <nu-circle box="y" size="14" fill=" hue(0 0 0 70%)" padding border="0">
          <nu-circle place="inside" size="12" overflow="no" shadow="special" border="0">
            <nu-img label="Photo">
              <!-- "alt" attribute should be empty in this case. -->
              <!-- We specified the label in the parent.-->
              <img src="./assets/tenphi_photo.jpg" alt=""/>
            </nu-img>
          </nu-circle>
        </nu-circle>
        <nu-flow gap size="lg">
          <nu-h1
            size="xl" text="b" color="white"
            nx-appear="timeout(10)" transition="opacity, move" opacity="0 :appear[1]"
            move="0 1x :appear[0 0]">
            Andrey Yamanov
          </nu-h1>
          <nu-description
            nx-appear="timeout(250)" transition="opacity, move" opacity="0 :appear[1]"
            move="0 1x :appear[0 0]">
            CSS Cheater, UX&nbsp;Advocate
          </nu-description>
        </nu-flow>
        <nu-menu
          label="Social links"
          flow="row" size="xl" gap="2x" content="center"
          nx-appear="timeout(500)" transition="opacity, move" opacity="0 :appear[1]"
          move="0 3x :appear[0 0]">
          <nu-attrs for="menuitem" padding radius clear
                    nx-offset transition="move :offset[no]"
                    move="(--offset-x * 1x) (--offset-y * 1x)"></nu-attrs>
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
      </nu-article>

      <nu-pane
        role="region"
        flow="row" gap label="Theme settings"
        place="top 4x" padding size="lg" radius="2.5x" fill="hue(0 0 0 5%)"
        nx-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]"
        move="0 -6x :appear[0 0]">
        <nu-attrs for="btn" clear padding mark="hover hue(0 0 0 10% special)"></nu-attrs>
        <nu-attrs for="tooltip" text="nowrap"></nu-attrs>
        <nu-btn
          id="scheme" toggle label="Change hue" clear padding>
          <nu-icon name="color-palette"></nu-icon>
          <nu-popup width="10" padding="2x" radius="round" fill="hue(0 0 0 70)" backdrop="blur(1x)"
                    shadow="special">
            <nu-attrs for="slider-cap" :border="`!1sw hue(${hue} 100 high special)`"></nu-attrs>
            <nu-slider
              id="hue"
              :value="initialHue"
              min="0" max="359"
              @input="hue = $event.detail"
              image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))">
            </nu-slider>
          </nu-popup>
          <nu-tooltip>Change hue</nu-tooltip>
        </nu-btn>
        <nu-btn
          id="scheme" toggle label="Scheme" :pressed="scheme === 'dark'"
          control=":root[data-nu-scheme]" value="dark" off-value="light">
          <nu-icon name="moon"></nu-icon>
          <nu-tooltip>Change scheme</nu-tooltip>
        </nu-btn>
        <nu-btn
          id="contrast" toggle label="Contrast mode"
          control=":root[data-nu-contrast]" value="high" off-value="low">
          <nu-icon name="eye"></nu-icon>
          <nu-tooltip>Change contrast</nu-tooltip>
        </nu-btn>
      </nu-pane>

      <nu-pane
        role="complementary" label="Information"
        place="bottom 4x" radius fill="hue(0 0 0 5%)" padding="1x 2x" text="nowrap"
        nx-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]"
        move="0 6x :appear[0 0]">
        <nu-el label="made with numl">
          made with
          <nu-link to="!https://numl.design/">numl</nu-link>
        </nu-el>
        <nu-line orient="v" fill="hue(0 0 100 30%)"></nu-line>
        <nu-el label="View source code on github">view
          <nu-link to="!https://github.com/tenphi/tenphi.me">source code</nu-link>
        </nu-el>
      </nu-pane>
    </nu-block>
  </nu-block>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import Settings from './services/settings';
import { setFavIcon } from './favicon';
import { hue as hueGenerator } from 'numl';

const ROOT = document.documentElement;

export default {
  setup() {
    const initialHue = Settings.get('hue');
    const hue = ref(initialHue);
    const queryList = ref(matchMedia('(prefers-color-scheme: dark)'));
    const scheme = computed(() => {
      return (ROOT.dataset.nuScheme || queryList.value.matches) ? 'dark' : 'light';
    });

    /**
     * Function to update favicon based on current hue
     */
    function applyFavIcon() {
      setFavIcon(hueGenerator(`${hue.value} 70`, scheme.value === 'dark'));
    }

    // On hue change:
    // Save hue to the storage and update favicon color
    watch(() => hue.value, (hue) => {
      Settings.set('hue', hue);
      applyFavIcon();
    });

    // Create background gradient
    const gradient = computed(() => {
      function grad(angle, step) {
        return `linear(${angle}deg, hue(${(hue.value + 360 - step) % 360} 65 33 special), hue(${(hue.value + step) % 360} 65 33 special))`
      }

      return `${grad(-15, 30)}||${grad(-40, 15)}`;
    });

    onMounted(() => {
      queryList.value.addListener((media) => {
        queryList.value = media;
      });

      applyFavIcon();
    });

    return {
      hue,
      scheme,
      gradient,
      initialHue,
    };
  },
};
</script>
