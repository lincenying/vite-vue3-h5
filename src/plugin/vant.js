/* eslint-disable no-inline-comments */
import {
    // ActionBar, // van-action-bar
    // ActionBarButton, // van-action-bar-button
    // ActionBarIcon, // van-action-bar-icon
    // ActionSheet, // van-action-sheet
    // AddressEdit, // van-address-edit
    // AddressList, // van-address-list
    // Area, // van-area
    // Badge, // van-badge
    Button, // van-button
    // Calendar, // van-calendar
    // Card, // van-card
    // Cascader, // van-cascader
    Cell, // van-cell
    CellGroup, // van-cell-group
    // Checkbox, // van-checkbox
    // CheckboxGroup, // van-checkbox-group
    // Circle, // van-circle
    // Col, // van-col
    // Collapse, // van-collapse
    // CollapseItem, // van-collapse-item
    // ContactCard, // van-contact-card
    // ContactEdit, // van-contact-edit
    // ContactList, // van-contact-list
    // CountDown, // van-count-down
    // Coupon, // van-coupon
    // CouponCell, // van-coupon-cell
    // CouponList, // van-coupon-list
    DatePicker, // van-date-picker
    Dialog, // van-dialog
    Divider, // van-divider
    // DropdownItem, // van-dropdown-item
    // DropdownMenu, // van-dropdown-menu
    Empty, // van-empty
    Field, // van-field
    // Form, // van-form
    Grid, // van-grid
    GridItem, // van-grid-item
    // Icon, // van-icon
    Image, // van-image
    ImagePreview, // van-image-preview
    // IndexAnchor, // van-index-anchor
    // IndexBar, // van-index-bar
    // Lazyload, // van-lazyload
    List, // van-list
    Loading, // van-loading
    // Locale, // van-locale
    NavBar, // van-nav-bar
    // NoticeBar, // van-notice-bar
    // Notify, // van-notify
    // NumberKeyboard, // van-number-keyboard
    // Overlay, // van-overlay
    // Pagination, // van-pagination
    // PasswordInput, // van-password-input
    // Picker, // van-picker
    // Popover, // van-popover
    Popup, // van-popup
    // Progress, // van-progress
    PullRefresh, // van-pull-refresh
    // Radio, // van-radio
    // RadioGroup, // van-radio-group
    // Rate, // van-rate
    // Row, // van-row
    // Search, // van-search
    // ShareSheet, // van-share-sheet
    // Sidebar, // van-sidebar
    // SidebarItem, // van-sidebar-item
    Skeleton, // van-skeleton
    // Slider, // van-slider
    // Step, // van-step
    // Stepper, // van-stepper
    // Steps, // van-steps
    // Sticky, // van-sticky
    // SubmitBar, // van-submit-bar
    // Swipe, // van-swipe
    // SwipeCell, // van-swipe-cell
    // SwipeItem, // van-swipe-item
    // Switch, // van-switch
    Tab, // van-tab
    Tabbar, // van-tabbar
    TabbarItem, // van-tabbar-item
    Tabs, // van-tabs
    // Tag, // van-tag
    Toast, // van-toast
    // TreeSelect, // van-tree-select
    // Uploader // van-uploader
    showDialog,
    showConfirmDialog,
    showToast,
    showLoadingToast,
    showSuccessToast,
    showFailToast,
    closeToast
} from 'vant'

function install(app) {
    // app.use(ActionBar) // van-action-bar
    // app.use(ActionBarButton) // van-action-bar-button
    // app.use(ActionBarIcon) // van-action-bar-icon
    // app.use(ActionSheet) // van-action-sheet
    // app.use(AddressEdit) // van-address-edit
    // app.use(AddressList) // van-address-list
    // app.use(Area) // van-area
    // app.use(Badge) // van-badge
    app.use(Button) // van-button
    // app.use(Calendar) // van-calendar
    // app.use(Card) // van-card
    // app.use(Cascader) // van-cascader
    app.use(Cell) // van-cell
    app.use(CellGroup) // van-cell-group
    // app.use(Checkbox) // van-checkbox
    // app.use(CheckboxGroup) // van-checkbox-group
    // app.use(Circle) // van-circle
    // app.use(Col) // van-col
    // app.use(Collapse) // van-collapse
    // app.use(CollapseItem) // van-collapse-item
    // app.use(ContactCard) // van-contact-card
    // app.use(ContactEdit) // van-contact-edit
    // app.use(ContactList) // van-contact-list
    // app.use(CountDown) // van-count-down
    // app.use(Coupon) // van-coupon
    // app.use(CouponCell) // van-coupon-cell
    // app.use(CouponList) // van-coupon-list
    app.use(DatePicker) // van-date-picker
    app.use(Dialog) // van-dialog
    app.use(Divider) // van-divider
    // app.use(DropdownItem) // van-dropdown-item
    // app.use(DropdownMenu) // van-dropdown-menu
    app.use(Empty) // van-empty
    app.use(Field) // van-field
    // app.use(Form) // van-form
    app.use(Grid) // van-grid
    app.use(GridItem) // van-grid-item
    // app.use(Icon) // van-icon
    app.use(Image) // van-image
    app.use(ImagePreview) // van-image-preview
    // app.use(IndexAnchor) // van-index-anchor
    // app.use(IndexBar) // van-index-bar
    // app.use(Lazyload) // van-lazyload
    app.use(List) // van-list
    app.use(Loading) // van-loading
    // app.use(Locale) // van-locale
    app.use(NavBar) // van-nav-bar
    // app.use(NoticeBar) // van-notice-bar
    // app.use(Notify) // van-notify
    // app.use(NumberKeyboard) // van-number-keyboard
    // app.use(Overlay) // van-overlay
    // app.use(Pagination) // van-pagination
    // app.use(PasswordInput) // van-password-input
    // app.use(Picker) // van-picker
    // app.use(Popover) // van-popover
    app.use(Popup) // van-popup
    // app.use(Progress) // van-progress
    app.use(PullRefresh) // van-pull-refresh
    // app.use(Radio) // van-radio
    // app.use(RadioGroup) // van-radio-group
    // app.use(Rate) // van-rate
    // app.use(Row) // van-row
    // app.use(Search) // van-search
    // app.use(ShareSheet) // van-share-sheet
    // app.use(Sidebar) // van-sidebar
    // app.use(SidebarItem) // van-sidebar-item
    app.use(Skeleton) // van-skeleton
    // app.use(Slider) // van-slider
    // app.use(Step) // van-step
    // app.use(Stepper) // van-stepper
    // app.use(Steps) // van-steps
    // app.use(Sticky) // van-sticky
    // app.use(SubmitBar) // van-submit-bar
    // app.use(Swipe) // van-swipe
    // app.use(SwipeCell) // van-swipe-cell
    // app.use(SwipeItem) // van-swipe-item
    // app.use(Switch) // van-switch
    app.use(Tab) // van-tab
    app.use(Tabbar) // van-tabbar
    app.use(TabbarItem) // van-tabbar-item
    app.use(Tabs) // van-tabs
    // app.use(Tag) // van-tag
    app.use(Toast) // van-toast
    // app.use(TreeSelect) // van-tree-select
    // app.use(Uploader) // van-uploader

    app.config.globalProperties.$dialog = {
        default: showDialog,
        confirm: showConfirmDialog
    }
    app.config.globalProperties.$toast = {
        default: showToast,
        loading: showLoadingToast,
        success: showSuccessToast,
        fail: showFailToast,
        close: closeToast
    }
}
export default {
    install
}
