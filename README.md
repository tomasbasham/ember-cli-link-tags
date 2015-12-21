# Ember-cli-link-tags [![Build Status](https://travis-ci.org/tomasbasham/ember-cli-link-tags.svg?branch=master)](https://travis-ci.org/tomasbasham/ember-cli-link-tags)

An [Ember CLI](http://www.ember-cli.com/) addon to easily add `<link>` tags to the head of a HTML document.

There may be many reasons to define a link between a HTML document and an internal or external resource. One reason is to provide search engines and SEO tools the best URL when there are several choices. This can occur for example when there are multiple variants of the same resource. This addon allows you to define these links statically or dynamically when transitioning between routes.

This addon is ideal for use with SEO tools such as [MOZ](https://moz.com/) to significantly improve impressions on Google and other search engines whilst reducing situations where content is mistakenly conceived as duplicate.

## Installation

From within your Ember CLI project directory run:
```
ember install ember-cli-link-tags
```

## Usage

To use this addon you must include the `Linkable` mixin within the routes you intend to define links. The mixin allows you to define links in two ways; as a function that runs within the context of the route; or as a plain JavaScript object.

### Function

Using this method to define link tags you must provide key/value paris of link attributes dynamically using the model defined on the route or any other attributes set on the controller. The `links` function returns a plain JavaScript object with the appropriate key/value pairs.

##### <a name="method-example"></a>Example:

```JavaScript
// app/routes/posts.js
import Ember from 'ember';
import Linkable from 'ember-cli-link-tags/mixins/linkable';

export default Ember.Route.extend(Linkable, {
  links: function() {
    return {
      canonical: '/posts',
      next: '/posts?page=' + this.get('controller.nextPage')
    };
  }
});
```

This will add the `canonical` and `next` link tags to the head of the document. The value of `nextPage` is taken from the controller and appended to the end of the `next` value. Of course the key/value paris returned by the function can be whatever you want and application specific.

### POJO

You may also use a plain JavaScript object to define purely static links.

##### <a name="object-example"></a>Example:

```JavaScript
// app/routes/posts.js
import Ember from 'ember';
import Linkable from 'ember-cli-link-tags/mixins/linkable';

export default Ember.Route.extend(Linkable, {
  links: {
    canonical: '/posts',
    next: '/posts?page=2'
  }
});
```

This will add the `canonical` and `next` link tags to the head of the document. The key/value pairs here are all static and defined before runtime. Of course the key/value paris can be whatever you want and application specific.

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
