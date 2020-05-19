import _ from 'lodash'

export default (str) => {
    return _.camelCase(str).toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, 'l')
}