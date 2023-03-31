function FormatDate(timestamp) {
    return new Intl.DateTimeFormat('en-AU', {weekday: 'short', day: 'numeric', month: 'numeric'}).format(timestamp * 1000)
}

export default FormatDate