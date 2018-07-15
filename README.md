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

