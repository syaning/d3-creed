module.exports = clear;

function clear() {
    this.glink.selectAll('*').remove();
    this.gnode.selectAll('*').remove();
}
