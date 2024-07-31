// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    image::Image, menu::{MenuBuilder, MenuItemBuilder}, tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent}, Manager, WebviewWindow
}; 
use tauri_plugin_positioner::{Position, WindowExt};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn toggle(webiew_window: tauri::WebviewWindow) {
    toggle_window(&webiew_window);
}


fn toggle_window(webview: &WebviewWindow){
    let window = &webview.as_ref().window();
    let is_visible = window.is_visible().expect("is_visible");
    if is_visible {
        let _ = window.hide();
    } else {
        let _ = window.show();
    }
}



fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_positioner::init())
        .invoke_handler(tauri::generate_handler![toggle])
        .setup(|app| {
            let toggle = MenuItemBuilder::with_id("toggle", "Toggle").build(app)?;
            let quit = MenuItemBuilder::with_id("quit", "Quit").build(app)?;

            let menu = MenuBuilder::new(app).items(&[&toggle, &quit]).build()?;

            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .on_menu_event(move |app,event| match event.id().as_ref() {
                    "toggle" => {
                        let webview = app.get_webview_window("main").unwrap();
                        toggle_window(&webview);
                    },
                    "quit" => {
                       app.exit(0)
                    },
                    _ => {}
                })
                .tooltip("Imperialist")
                .icon(Image::from_path("./icons/icon.png")?)
                .icon_as_template(true)
                .on_tray_icon_event(|tray,event| {
                    let app = tray.app_handle();
                    // Init Positioner
                    tauri_plugin_positioner::on_tray_event(app.app_handle(), &event);

                    let webview = app.get_webview_window("main").unwrap();

                    // Position Window on top of the tray icon
                    let _ = webview.as_ref().window().move_window(Position::TrayCenter);

                    // When user clicks on the tray icon
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event {
                        // Toggle Window Visibility
                        toggle_window(&webview);
                    }   
                })
                .build(app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
