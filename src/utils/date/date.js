function formatFrenchDateTime(date) {
    const dateTime = new Date(date);

    const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(dateTime);
}

function formatLongFrenchDate (dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

module.exports = {
    formatFrenchDateTime,
    formatLongFrenchDate,
}