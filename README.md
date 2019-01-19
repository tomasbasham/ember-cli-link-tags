# ember-cli-link-tags [![Build Status](https://travis-ci.org/tomasbasham/ember-cli-link-tags.svg?branch=master)](https://travis-ci.org/tomasbasham/ember-cli-link-tags)

An [Ember CLI](https://ember-cli.com/) addon to easily add `<link>` tags to the
head of a HTML document.

There may be many reasons to define a link between a HTML document and an
internal or external resource. One reason is to provide search engines and SEO
tools the best URL when there are several choices. This can occur for example
when there are multiple variants of the same resource. This addon allows you to
define these links statically or dynamically when transitioning between routes.

This addon is ideal for use with SEO tools such as [MOZ](https://moz.com/) to
significantly improve impressions on Google and other search engines whilst
reducing situations where content is mistakenly conceived as duplicate.

## Compatibility

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

## Installation

From within your Ember CLI project directory run:
```
ember install ember-cli-link-tags
```

## Usage

To use this addon you must include the `Linkable` mixin within the routes you
intend to define links. The mixin allows you to define links as plain
JavaScript Objects (POJOs) returned from a `links` method that runs within the
context of the route.

### Links Method

Link tags are described as key/value pairs of attributes that may be formed
dynamically using the model defined on the route or any other attributes set on
the controller. The `links` function returns a plain JavaScript object with the
appropriate key/value pairs.

##### Links Example

```JavaScript
// app/routes/posts.js
import Route from '@ember/routing/route';
import Linkable from 'ember-cli-link-tags/mixins/linkable';

import { get } from '@ember/object';

export default Route.extend(Linkable, {
  links() {
    return {
      canonical: '/posts',
      next: '/posts?page=' + get(this, 'controller.nextPage')
    };
  }
});
```

This will add the `canonical` and `next` link tags to the head of the document.
The value of `nextPage` is taken from the controller and appended to the end of
the `next` value. Of course the key/value pairs returned by the function can be
whatever you want and application specific.

## License

This project is licensed under the [MIT License](LICENSE.md).
