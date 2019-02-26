# Vue Gen
## @tristan-smith/vue-gen
A simple vue utility script for generating components. Templates follow Airbnb Base eslint rules.
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

## vue-gen c <componentName>
Generates a vue component in the current working directory

### Options
| small flag | long flag | effect |
| ---------- | ---------- | ------ |
| -v | --verbose | modifier, generates verbose version (multifile component, for example) |
| -s | --small | modifier, generates small version |
|  |  |  |

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
