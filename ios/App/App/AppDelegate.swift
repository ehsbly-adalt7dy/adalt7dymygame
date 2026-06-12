import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // ✅ إصلاح الـ Black Flash — لون خلفية اللعبة
        let bgColor = UIColor(red: 168/255, green: 216/255, blue: 234/255, alpha: 1.0) // #a8d8ea
        
        // خلفية الـ Window الرئيسي
        self.window?.backgroundColor = bgColor
        
        // خلفية الـ WebView نفسه
        if let rootVC = self.window?.rootViewController {
            rootVC.view.backgroundColor = bgColor
            
            // ابحث عن الـ WKWebView وعيّن له اللون
            setWebViewBackground(in: rootVC.view, color: bgColor)
        }
        
        return true
    }
    
    // ✅ دالة تبحث عن الـ WKWebView وتعيّن له الخلفية
    private func setWebViewBackground(in view: UIView, color: UIColor) {
        for subview in view.subviews {
            if NSStringFromClass(type(of: subview)).contains("WKWebView") {
                subview.backgroundColor = color
                subview.isOpaque = false
            }
            setWebViewBackground(in: subview, color: color)
        }
    }

    func applicationWillResignActive(_ application: UIApplication) {}

    func applicationDidEnterBackground(_ application: UIApplication) {}

    func applicationWillEnterForeground(_ application: UIApplication) {}

    func applicationDidBecomeActive(_ application: UIApplication) {
        // ✅ تأكيد اللون عند كل مرة يرجع التطبيق للواجهة
        let bgColor = UIColor(red: 168/255, green: 216/255, blue: 234/255, alpha: 1.0)
        self.window?.backgroundColor = bgColor
    }

    func applicationWillTerminate(_ application: UIApplication) {}

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}
