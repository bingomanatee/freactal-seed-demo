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
    <dd> you can <pre>pushTo[arrayProp]</pre>, <pre>unshiftTo[arrayProp]</pre>,change a single element by index, and
      even run a <pre>map[arrayProp</pre> over all the items
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

</article>);
