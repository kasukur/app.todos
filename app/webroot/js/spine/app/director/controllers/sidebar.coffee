Spine ?= require("spine")
$      = Spine.$

class SidebarView extends Spine.Controller

  elements:
    ".items"  : "items"
    "input"   : "input"

  #Attach event delegation
  events:
    "click button"          : "create"
    "keyup input"           : "filter"
    #"click input"           : "filter"
    "dblclick .draghandle"  : 'toggleDraghandle'

  #Render template
  template: (items) ->
    $("#galleriesTemplate").tmpl(items)

  constructor: ->
    super
    Spine.App.galleryList = @list = new Spine.GalleryList
      el: @items,
      template: @template

    Gallery.bind "refresh", @proxy @loadJoinTables
    Gallery.bind "refresh change", @proxy @render

  loadJoinTables: ->
    GalleriesAlbum.records = Gallery.joinTableRecords

  filter: ->
    console.log 'Sidebar::filter'
    @query = @input.val();
    @render();

  render: (item) ->
    console.log 'Sidebar::render'
    items = Gallery.filter @query
    items = items.sort Gallery.nameSort
    @list.render items, item

  newAttributes: ->
    name: ''
    author: ''

  #Called when 'Create' button is clicked
  create: (e) ->
    e.preventDefault()
    @preserveEditorOpen('gallery', App.albumsShowView.btnGallery)
    gallery = new Gallery @newAttributes()
    gallery.save()
  
  toggleDraghandle: ->
    width = =>
      width =  @el.width()
      max = App.vmanager.max()
      min = App.vmanager.min
      if width >= min and width < max-20
        max+"px"
      else
        min+'px'
    
    @el.animate
      width: width()
      400

module?.exports = SidebarView