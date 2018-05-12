import style from './About.module.css';

export default () => (<article className={style.About}>
  <h2>About This Site</h2>
  <p>This site uses a combination of technologies to maintain state:</p>
  <ol>
    <li><a href="https://github.com/FormidableLabs/freactal" target="_blank">Freactal</a>, a Thunk-like state
      management system for React and React-ish things.
    </li>
    <li><a href="https://github.com/bingomanatee/freactal-seed" target="_blank">Freactal-Seed</a>, an extension
      module for Freactal that gives you terser event/state
      creation hooks
    </li>
    <li><a href="https://neutrino.js.org/" target="_blank">NeutrinoRC</a>, a wepack project-kickstarting system</li>
    <li><a href="https://github.com/young-steveo/bottlejs" target="_blank">Bottle.js</a>,
      an injection microservice for javascript embedded in <b>Freactal-seed</b>, and used to enable a little
      injection
      for testing
    </li>
    <li><a href="https://reacttraining.com/react-router/" target="_blank">React Router</a>, a routing system for
      React
    </li>
    <li>(and of course, React).</li>
  </ol>

  <p>Primarily this is a showcase for <b>Freactal-Seed</b>. </p>

  <h2>The State Definition</h2>
  <p>Here is the complete state definition; the only omitted element is the bigStock API.</p>

  <iframe src={"/static/state.js"} style={({width: '100%', height: '30rem', overflow: 'scroll'})}/>

  <h3>A few things to note:</h3>
  <dl>
    <dt>The syntax is fairly economical</dt>
    <dd> you don't have to define actions (effects in freactal) and state seperately;
      there are convenience methods for simple string, array, object and integer properties
    </dd>
    <dt>The entire state is synced with localState</dt>
    <dd>if you reload the page, all your state will be reloaded as it was when you left it. Elements are carefully
      serialized/
      deserialized by type, and you can customize how an individual element is serialized/deserialized.
    </dd>
    <dt>There are a host of methods for dealing with arrays in state</dt>
    <dd> you can <code>pushTo[arrayProp]</code>, <code>unshiftTo[arrayProp]</code>,change a single element by index, and
      even run a <code>map[arrayProp]</code> over all the items
      to selectively update (as is done when you adjust cart quantity).
    </dd>
  </dl>
  <h3>Some things that are more subtle</h3>
  <dl>
    <dt>Many components can be simple/functional</dt>
    <dd>The fact that state and effects are accessed from properties means the only time you need a component
      is when you want to use the event system (say in the detail page for pulling data rom the API after load).
      And many of those could be made more functional with a little effort.
    </dd>
    <dt>All of the Effects can be tested without instantiating any DOM/Components</dt>
    <dd>The tests are coming but -- they execute purely on state providing a clean seperation between
      view and state management
    </dd>
    <dt>Combining async and external calls with effects is (relatively) easy</dt>
    <dd>managing cross-system effects is never completely simple but you can mix external promises with effects calls
      to keep your state up to date.
    </dd>
  </dl>

  <h1>A briefing on Freactal</h1>
  <p>Although it has its own documentation, for those for whom this is the first exposure to it here are a few
    useful points for "getting" the "Freactal way" of managing state</p>

  <h2>Freactal Context</h2>
  <p>The state and effects artifact that makes up the core of Freactal has a hash of named effects
    (analogous to the actions of redux) and a hash of state items. State values can be anything you want --
    strings, numbers, null, booleans, objects, arrays... </p>
  <div className={style.imageFrame}>
    <img src="/static/images/graphics/context.png"/>
  </div>
  <p>Although the state seed is a single objects, it expresses itself in the React components as two individual
    properties, <code>state</code> and <code>effect </code>.
    (provided the components are wrapped with <code>freactal.injectState</code></p>
  <h2>Effects</h2>
  <p>Effects are functions that:</p>
  <ol>
    <li>return a function that changes state ("state mutator")</li>
    <li>return a promise that returns a state mutator</li>
  </ol>
  <p>so, you can write an effect as a <i>synchronous</i> function that returns a function, </p>
  <div className={style.imageFrame}>
    <img src="/static/images/graphics/incrementalCount.png"/>
  </div>
  <div className={style.imageFrame}>
    <img src="/static/images/graphics/setCart.png"/>
  </div>
  <p>or as an <i>asynchronous</i> function that returns a promise.
    (setCart in this context is a function that returns a promise.)</p>
  <div className={style.imageFrame}>
    <img src="/static/images/graphics/clearCart.png"/>
  </div>
  <p>Regardless of how you write it,
    <i>every effect is transmuted into a promise.</i> So when you use the effects argument,
    you can <code>.then(..)</code> any effect from that hash, regardless of how you wrote it.</p>
  <p>
    The effects are passed in as arguments to the individual effect functions.
    since one form of a valid effect is a function <i>that returns a promise that returns a mutator</i>,
    it also means returning another effect's result is the equivalent of returning a mutator.
  </p>
  <div className={style.imageFrame}>
    <img src="/static/images/graphics/pushCart.png"/>
  </div>
  <h2>Some more Freactal Craziness</h2>
  <p>
    When writing state mutators its best to either return state unchanged, or return a brand
    new object. use <code>Object.assign(...)</code> to make sure
    your state is a new object.
  </p>
  <p>Unlike Redux, Freactal state is largely a single global dictionary. There are ways of getting
    around this; you can use component state for transient values, and you can define child states
    that only kick in for child components. However, for values you want to sync with localStorage,
    you'll want to rely on the master dictionary.
  </p>
  <p>You can, however, group code relating to specific contexts in specific files. You can define your state
    object in one file, then pass it through other files to add state and effects for specific scopes. </p>
  <p>You can fire off effects without waiting for the result. this is true within your components,
    within your effects code, or even within the state mutator. (you will have to be a little sensible
    about doing so in contradictory ways, but if you need to flip simple values, you don't have to wait for
    the <code>effect.method().then()</code> to resolve</p>
  <p>Probably one of the least good things about Freactal is that you don't have access to current state
  outside of the state mutator function; and that function is synchronous. The good news is that inside that mutator
  you still have access to the events hash from the outer closure. So if you want to "feed back" a state value
    into an effect, you have to do the following:
  </p>
  <ol>
    <li>write an effect "A" with an argument slot that you intend to satisfy from state</li>
    <li>write an effect "B" that calls "A" from its state mutator. "B"'s mutator then returns
    state unchanged.</li>
  </ol>
</article>);
