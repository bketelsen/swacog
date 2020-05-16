<script>
  import Typewriter from "svelte-typewriter";

  export let hex = "";
  export let message = "HELLO";
  let visible = false;

  function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join(" ");
  }

  function typewriter(node, { speed = 50 }) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`
      );
    }

    const text = node.textContent;
    const duration = text.length * speed;

    return {
      duration,
      tick: t => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      }
    };
  }
  function handleClick(event) {
    hex = "";
    hex = "Sending " + ascii_to_hexa(message);
    visible = true;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>NASA COMMS</h1>
  <p>Enter your message for the stranded astronaut below:</p>
  <input id="message" type="text" value={message} />
  <button on:click={handleClick} id="submit" name="submit" value="send>>">
    Send >>
  </button>

  {#if visible}
    <p in:typewriter>{hex}</p>
  {/if}

</main>
