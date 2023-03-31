function FormatDayTime(timestamp) {
    return new Intl.DateTimeFormat('en-US', {weekday: 'long', hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
}

export default FormatDayTime