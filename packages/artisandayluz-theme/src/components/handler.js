const tribeEventsHandler = {
    name: 'tribe-events',
    priority: 10,
    pattern: '/tribe-events/:id',
    func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source
    const { id } = params

    const response = await api.get({
        endpoint: `/tribe/events/v1/events/${id}`
    })

    const data = await response.json()
    const currentPageData = state.source.data[route]

    Object.assign(currentPageData, {
        id,
        data,
        isEvent: true
    })
    }
}

export default tribeEventsHandler;