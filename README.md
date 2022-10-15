# Vue Gen
## @tristan-smith/vue-gen
A simple utility script for generating Vue components. Templates follow Airbnb Base eslint rules.
## Example
```
vue-gen c user-dashboard -v
```
creates
```
<cwd>
--user-dashboard
----user-dashboard.vue
----user-dashboard.js
----user-dashboard.css
----user-dashboard.html
```

## "Create Component" Command
### vue-gen c <componentName>
Generates a Vue component in the current working directory

#### Options
| small flag | long flag | effect |
| ---------- | ---------- | ------ |
| -v | --verbose | modifier, generates verbose version (Generates a Vue component with individual files for script, template, and styles.) |
| -s | --small | modifier, generates single file Vue component |
|  |  |  |

## Help

`vue-gen help` will give you the help information for the whole utility.

`vue-gen help c` will give you the help information for the `c` (Create) command.

## Setup
```
npm install --save-dev @tristan-smith/vue-gen
```
(can also be installed globally)

## Development
Fork and clone, then run
```
npm install -g
npm link
```
Run the script anywhere and test your changes to the project.

## Issues

Please report any issues on GitHub, and I'll try my best to get back to you!

## What about the Vue Composition API?

Coming soon...