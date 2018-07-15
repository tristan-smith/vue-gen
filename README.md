# Vue Gen
## @tristan-smith/vue-gen
A simple vue utility script for generating components.
## Example
```
vue-gen -c user-dashboard -v
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

## Options
| small flag | long flag | effect |
| ---------- | ---------- | ------ |
| -c | --component | generate a vue component, required name argument |
| -v | --verbose | modifier, generates verbose version (multifile component, for example) |
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

## To Do?
* Better error handling
* Tests
* Interaction with a vue router file (import component automatically)