# Integration Example: Single Page App (Senna.JS)

This repository provides a basic [Senna.JS][senna] example with
[Channel.me][channel] integration.

## Integration Overview

Integration with Channel.me can be done in 2 ways:

### "Static" Integration

Simply adding an element on the page with the id of `wwwchannelme`
and a `data-code` attribute with your client code as the value,
followed by the `siteconnect` script, is all it takes.

For example:

    <p id="wwwchannelme" data-code="your-partner-id">NNNN</p>
    <script type="text/javascript" src="//channel.me/siteconnect.js"></script>

Once the page has loaded, the `NNNN` placeholder will be replaced with
the cobrowse code which can be used from Channel.me's Agent interface.

### "Dynamic" Integration

For more dynamic sites, including Single-Page Applications (SPAs),
the process is slightly different.

Firstly, the `siteconnect` script should be added to the header of the
page, and should include a `data-no-init` attribute. This stops
`siteconnect` from starting as soon as the page loads. The script tag
would look something like this:

    <script
      type="text/javascript"
      src="//channel.im/siteconnect.js"
      data-no-init></script>

It is then up to the SPA's developers to call siteconnect's `start()`
function when the page has finished rendering, including after any
significant DOM updates. For example:

    spa.on("dom-update-finished", function(){
        site_connect.start("your-partner-id");
    });

The `site_connect.start()` call has been designed to be idempotent,
so can be called repeatedly without much overhead.

## Example with Senna.JS

As part of this repository we've provided an example of a Senna.JS
integration.

### Key Example files

#### `example.html`

This is the primary html example. Note that in this example we are
mounting the SPA on the `body` of the page by setting the `data-senna`
and `data-senna-surface` attributes there.

Please also note the `data-senna-track="permanent"` attribute on the
script tag which loads `siteconnect`; this is to ensure this resource
isn't removed incorrectly.

#### `example.js`

This is where we're triggering `site_connect.setup(...)` in 2
circumstances:

* First, on page load. This is because Senna.JS does not emit an
  event when the SPA has mounted successfully.
* Secondly, we're telling Senna.JS to call `setup` whenever page
  navigation completes, which is a significant DOM change.

### Running the example

If you have the Python runtime on your system, you can quickly run
this example on your machine.

Simply clone, or download & extract, this repository, change into
the directory from your terminal, and run the following command:

    $ python3 -m http.server 3333

Then visit http://localhost:3333/ in a browser to see
the example running.

We recommend keeping the JavaScript console open in your
browser while you navigate the example site to review
relevant events and output.

## Support

For further support, please contact [support@channel.me][support].

## Disclaimer

This code is provided as is and is only intended to be used for
illustration purposes. This code is not production-ready and is not
meant to be used in a production environment. This repository is to be
used as a tool to help customers learn how to integrate with
Channel.me's siteconnect script. Any use of this repository or any of
its code in a production environment is highly discouraged.

[channel]: https://channel.me
[senna]: https://sennajs.com
[support]: mailto:support@channel.me
