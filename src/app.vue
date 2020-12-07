<template>
  <nu-block id="app" font="Baloo 2">
    <nu-base responsive="100rem" size="(100vw / 100)|1rem"></nu-base>
    <nu-props radius="2x"></nu-props>
    <nu-theme :hue="hue"></nu-theme>
    <nu-attrs for="menuitem" color="white"></nu-attrs>
    <nu-attrs for="btn" color="white"></nu-attrs>
    <nu-attrs for="link" color="white"></nu-attrs>
    <nu-props move-transition=".25s" opacity-transition=".25s"></nu-props>
    <nu-block
        theme="special"
        border="2x inside hue(0 0 0 40%)|||1x inside hue(0 0 0 40%)"
        :image="gradient"
        height="42 100vh initial" box="y" color="white">

      <nu-flow place="inside" gap="3x" color="white">
        <nu-article display="flex" gap="3x" items="center" text="center">
          <nu-circle box="y" size="14" fill="hue(0 0 0 70%)" padding border="0">
            <nu-circle place="inside" size="12" overflow="no" shadow="0 0 3x #shadow" border="0">
              <nu-img label="Photo" width="100%">
                <!-- "alt" attribute should be empty in this case. -->
                <!-- We specified the label in the parent.-->
                <img src="./assets/tenphi_photo.jpg" alt=""/>
              </nu-img>
            </nu-circle>
          </nu-circle>
          <nu-flow gap size="lg">
            <nu-h1
                size="xl" text="b" color="white"
                use-appear="timeout(10)" transition="opacity, move" opacity="0 :appear[1]"
                move="0 1x :appear[0 0]">
              Andrey Yamanov
            </nu-h1>
            <nu-description
                use-appear="timeout(250)" transition="opacity, move" opacity="0 :appear[1]"
                move="0 1x :appear[0 0]">
              CSS&nbsp;Cheater, DX&nbsp;Advocate<br/>
              UI/UX Lead Engineer at
              <nu-link to="!https://cube.dev">Cube.js</nu-link>
              <br/>
              Creator of
              <nu-link to="!https://numl.design">Numl.Design</nu-link>
            </nu-description>
          </nu-flow>
        </nu-article>
        <nu-nav
            label="Social links" flow="row" size="3x" gap="2x"
            use-appear="timeout(500)" transition="opacity, move" opacity="0 :appear[1]"
            move="0 3x :appear[0 0]">
          <nu-props
              move-transition=".15s"
              transition=".15s"></nu-props>
          <nu-attrs for="icon" filter="drop-shadow(0 .25rem 1rem rgba(0,0,0,0.2))"/>
          <nu-attrs for="btn" padding radius clear
                    use-offset transition="move :offset[no]"
                    move="(--offset-x * 1x) (--offset-y * 1x)"/>
          <nu-svg width="5" src="/img/christmas-tree.svg"/>

          <nu-btn to="!https://github.com/tenphi" label="Github">
            <nu-icon name="github"/>
          </nu-btn>
          <nu-btn to="!https://twitter.com/tenphi" label="Twitter">
            <nu-icon name="twitter"/>
          </nu-btn>
          <nu-btn to="!https://facebook.com/tenphi" label="Facebook">
            <nu-icon name="facebook" filter="drop-shadow(0 .25rem 1rem rgba(0,0,0,0.3))"/>
          </nu-btn>
          <nu-btn to="mailto:tenphi@gmail.com" label="Email">
            <nu-icon name="email" filter="drop-shadow(0 .25rem 1rem rgba(0,0,0,0.08))"/>
          </nu-btn>

          <nu-svg width="5" src="/img/christmas-tree.svg"/>
        </nu-nav>
      </nu-flow>

      <nu-aside
          display="flex" flow="row" gap label="Theme settings"
          place="top 4x" padding size="lg" radius="2.5x" fill="hue(0 0 0 5%)"
          use-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]"
          move="0 -6x :appear[0 0]" shadow="2x #shadow.05">
        <nu-attrs for="btn" clear padding mark="hover hue(0 0 0 10% special)"></nu-attrs>
        <nu-attrs for="tooltip" text="nowrap"></nu-attrs>
        <nu-btn
            id="hue" toggle label="Change hue" clear padding>
          <nu-icon name="color-palette"></nu-icon>
          <nu-popup width="10" padding="2x" radius="round" fill="hue(0 0 0 70)" backdrop="blur(1x)"
                    shadow border="0">
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
            id="scheme" toggle label="Scheme" :pressed="scheme === 'dark' || undefined"
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
      </nu-aside>

      <nu-footer
          label="Learn more about this site"
          display="flex" flow="row" gap="1x"
          place="bottom 4x" radius fill="hue(0 0 0 5%)" padding="1x 2x" text="nowrap"
          use-appear="timeout(1000) threshold(.1)" transition="opacity, move" opacity="0 :appear[1]"
          move="0 6x :appear[0 0]" shadow="2x #shadow.05">
        <nu-el label="made with numl">
          built with
          <nu-link to="!https://numl.design/">numl.design</nu-link>
        </nu-el>
        <!--        <nu-line orient="v" fill="hue(0 0 0 30% special)"></nu-line>-->
        <nu-icon name="heart" size="xl" space="1x 0"></nu-icon>
        <nu-el label="View source code on github">view
          <nu-link to="!https://github.com/tenphi/tenphi.me/blob/master/src/app.vue">source code
          </nu-link>
        </nu-el>
      </nu-footer>
    </nu-block>
  </nu-block>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import Settings from './services/settings';
import { setFavIcon } from './favicon';

const ROOT = document.documentElement;
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

function requireNude() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return;

    if (window.Nude) {
      resolve(window.Nude);
    } else {
      window.addEventListener('nudeReady', () => {
        resolve(window.Nude);
      });
    }
  });
}

export default {
  setup() {
    const initialHue = Settings.get('hue');
    const hue = ref(initialHue);
    const queryMedia = ref(matchMedia('(prefers-color-scheme: dark)'));
    const scheme = computed(() => {
      return (ROOT.dataset.nuScheme === 'dark' || queryMedia.value.matches) ? 'dark' : 'light';
    });

    /**
     * Function to update favicon based on current hue
     */
    async function applyFavIcon() {
      if (!isFirefox) {
        const Nude = await requireNude();

        setFavIcon(Nude.hue(`${hue.value} 70`, scheme.value === 'dark'));
      }
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

      return `${grad(-20, 35)}||${grad(-40, 35)}`;
    });

    onMounted(() => {
      queryMedia.value.addListener((media) => {
        queryMedia.value = media;
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
