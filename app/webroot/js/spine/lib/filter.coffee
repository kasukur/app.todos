Spine ?= require("spine")
Spine.Model.Filter = (
  ->
    Extend =
      filter: (query) ->
        return @.all() unless query
        @.select (item) ->
          item.select query

    Include =
      select: (query) ->
        query = query.toLowerCase()
        atts = (@.selectAttributes or @.attributes).apply @
        for key, value of atts
          value = value.toLowerCase()
          unless (value?.indexOf(query) is -1)
            return true
        false

    extended: ->
      @extend Extend
      @include Include
)()