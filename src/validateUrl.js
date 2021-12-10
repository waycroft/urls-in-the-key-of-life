exports.isValidUrl = (string) => {
    if (!string) throw 'input string was undefined';
    
    let match = string.match(/https?:\/\/[A-Za-z]+\.[A-Za-z]+/g);
    return !!match;
}