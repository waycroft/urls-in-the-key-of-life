exports.isValidUrl = (string) => {
    if (!string) throw 'input string was undefined';
    
    let match = string.match(/https?:\/\/(www)?.*/g);
    return !!match;
}