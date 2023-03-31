function FormatTime(timestamp) {
    return new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
}

export default FormatTime