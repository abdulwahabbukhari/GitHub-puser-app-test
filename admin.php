<?php
// admin.php - Complete Admin Panel for MH TECH Hosting
session_start();

// Load settings from file
$settings_file = 'settings.json';
$default_settings = [
    'site_name' => 'MH TECH HOSTING',
    'site_tagline' => 'Ignite Your Projects',
    'admin_username' => 'admin',
    'admin_password' => 'admin123',
    'owner_name' => 'MH TECH Team',
    'whatsapp_url' => 'https://whatsapp.com/channel/0029Vb6ZQPa5q08cHvIQDW2g',
    'youtube_url' => 'https://youtube.com/@mhtechteam',
    'loader_image' => 'https://i.ibb.co/LXkhNhT2/20251230-124032.jpg',
    'footer_text' => 'Powered by Innovation'
];

// Load or create settings
if (file_exists($settings_file)) {
    $settings = json_decode(file_get_contents($settings_file), true);
    if (!is_array($settings)) {
        $settings = $default_settings;
    }
} else {
    $settings = $default_settings;
    file_put_contents($settings_file, json_encode($settings, JSON_PRETTY_PRINT));
}

// Merge with defaults if any keys missing
foreach ($default_settings as $key => $value) {
    if (!isset($settings[$key])) {
        $settings[$key] = $value;
    }
}

// Handle admin login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === $settings['admin_username'] && $password === $settings['admin_password']) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: admin.php");
        exit;
    } else {
        $login_error = "Invalid credentials!";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

// Check admin login
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Show login form
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login - <?php echo $settings['site_name']; ?></title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            :root {
                --bg-primary: #0a0a0a;
                --bg-secondary: #1a1a1a;
                --bg-tertiary: #252525;
                --primary: #ff6b35;
                --secondary: #ffa726;
                --text-primary: #ffffff;
                --text-secondary: #e0e0e0;
                --text-muted: #aaaaaa;
                --border-color: #333333;
                --radius-lg: 12px;
                --radius-md: 8px;
                --shadow-lg: 0 20px 40px rgba(255, 107, 53, 0.2);
                --glow-primary: 0 0 15px rgba(255, 107, 53, 0.5);
            }
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
                font-family: 'Plus Jakarta Sans', sans-serif;
                background: var(--bg-primary);
                color: var(--text-primary);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: 
                    radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 167, 38, 0.15) 0%, transparent 50%),
                    linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            }
            
            .login-container {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 40px;
                max-width: 420px;
                width: 100%;
                margin: 20px;
                box-shadow: var(--shadow-lg);
            }
            
            .login-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .login-logo {
                width: 70px;
                height: 70px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-radius: var(--radius-md);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                color: white;
                box-shadow: var(--glow-primary);
                margin-bottom: 15px;
            }
            
            .login-header h1 {
                font-size: 24px;
                font-weight: 800;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .login-header p {
                color: var(--text-muted);
                font-size: 14px;
                margin-top: 5px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 6px;
                font-size: 13px;
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .form-group input {
                width: 100%;
                padding: 12px 14px;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-primary);
                font-family: inherit;
                font-size: 15px;
                transition: all 0.3s ease;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
            }
            
            .btn {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: var(--radius-md);
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                transition: all 0.3s ease;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(255, 107, 53, 0.4);
            }
            
            .alert-error {
                background: rgba(244, 67, 54, 0.15);
                border: 1px solid #f44336;
                color: #f44336;
                padding: 12px 16px;
                border-radius: var(--radius-md);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
            }
            
            .footer-text {
                text-align: center;
                color: var(--text-muted);
                font-size: 12px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <div class="login-header">
                <div class="login-logo"><i class="fas fa-fire"></i></div>
                <h1>Admin Panel</h1>
                <p><?php echo $settings['site_name']; ?> Management</p>
            </div>
            
            <?php if (isset($login_error)): ?>
                <div class="alert-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <?php echo $login_error; ?>
                </div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Username</label>
                    <input type="text" name="username" placeholder="Enter username" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <input type="password" name="password" placeholder="Enter password" required>
                </div>
                <button type="submit" name="login" class="btn">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            </form>
            
            <div class="footer-text">
                <i class="fas fa-shield-alt"></i> Secure Admin Access
            </div>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Handle settings update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_settings'])) {
    $updated = false;
    $message = "";
    
    // Update site settings
    if (isset($_POST['site_name']) && !empty($_POST['site_name'])) {
        $settings['site_name'] = trim($_POST['site_name']);
        $updated = true;
    }
    
    if (isset($_POST['site_tagline'])) {
        $settings['site_tagline'] = trim($_POST['site_tagline']);
        $updated = true;
    }
    
    if (isset($_POST['owner_name'])) {
        $settings['owner_name'] = trim($_POST['owner_name']);
        $updated = true;
    }
    
    if (isset($_POST['whatsapp_url'])) {
        $settings['whatsapp_url'] = trim($_POST['whatsapp_url']);
        $updated = true;
    }
    
    if (isset($_POST['youtube_url'])) {
        $settings['youtube_url'] = trim($_POST['youtube_url']);
        $updated = true;
    }
    
    if (isset($_POST['loader_image'])) {
        $settings['loader_image'] = trim($_POST['loader_image']);
        $updated = true;
    }
    
    if (isset($_POST['footer_text'])) {
        $settings['footer_text'] = trim($_POST['footer_text']);
        $updated = true;
    }
    
    // Handle password change
    if (isset($_POST['new_password']) && !empty($_POST['new_password'])) {
        $old_password = $_POST['old_password'] ?? '';
        if ($old_password === $settings['admin_password']) {
            $settings['admin_password'] = trim($_POST['new_password']);
            $updated = true;
            $message = "Password updated successfully! ";
        } else {
            $_SESSION['admin_error'] = "Current password is incorrect!";
        }
    }
    
    if ($updated) {
        file_put_contents($settings_file, json_encode($settings, JSON_PRETTY_PRINT));
        $_SESSION['admin_success'] = ($message ? $message : "") . "Settings updated successfully!";
    }
    
    header("Location: admin.php");
    exit;
}

// Handle site deletion
if (isset($_GET['delete']) && !empty($_GET['delete'])) {
    $site_to_delete = trim($_GET['delete']);
    
    if (strpos($site_to_delete, '..') !== false || strpos($site_to_delete, '/') !== false) {
        $_SESSION['admin_error'] = "Invalid site name";
    } else {
        $deleted = false;
        $dir_path = 'sites/' . $site_to_delete;
        
        if (is_dir($dir_path)) {
            $files = glob($dir_path . '/*');
            foreach ($files as $file) {
                if (is_file($file)) unlink($file);
            }
            if (rmdir($dir_path)) {
                $deleted = true;
            }
        } else {
            $extensions = ['html', 'htm', 'css', 'js'];
            foreach ($extensions as $ext) {
                $file_path = 'sites/' . $site_to_delete . '.' . $ext;
                if (file_exists($file_path)) {
                    if (unlink($file_path)) {
                        $deleted = true;
                        break;
                    }
                }
            }
        }
        
        if ($deleted) {
            $_SESSION['admin_success'] = "Site '$site_to_delete' deleted successfully!";
        } else {
            $_SESSION['admin_error'] = "Site '$site_to_delete' not found.";
        }
    }
    
    header("Location: admin.php");
    exit;
}

// Get site list
$uploaded_sites = [];
$total_size = 0;

if (is_dir('sites')) {
    $files = scandir('sites');
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $file_path = 'sites/' . $file;
            
            if (is_dir($file_path)) {
                $html_files = glob($file_path . '/*.{html,htm}', GLOB_BRACE);
                if (!empty($html_files)) {
                    $uploaded_sites[] = [
                        'name' => $file,
                        'url' => getWebsiteUrl($file),
                        'time' => filemtime($file_path),
                        'size' => getDirectorySize($file_path),
                        'type' => 'zip'
                    ];
                    $total_size += getDirectorySize($file_path);
                }
            } else {
                $file_ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($file_ext, ['html', 'htm', 'css', 'js'])) {
                    $site_name = pathinfo($file, PATHINFO_FILENAME);
                    $uploaded_sites[] = [
                        'name' => $site_name,
                        'url' => getWebsiteUrl($site_name),
                        'time' => filemtime($file_path),
                        'size' => filesize($file_path),
                        'type' => $file_ext
                    ];
                    $total_size += filesize($file_path);
                }
            }
        }
    }
    
    usort($uploaded_sites, function($a, $b) {
        return $b['time'] - $a['time'];
    });
}

// Helper functions
function getDirectorySize($path) {
    $total_size = 0;
    $files = scandir($path);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $file_path = $path . '/' . $file;
            if (is_file($file_path)) {
                $total_size += filesize($file_path);
            } elseif (is_dir($file_path)) {
                $total_size += getDirectorySize($file_path);
            }
        }
    }
    return $total_size;
}

function formatSize($bytes) {
    if ($bytes == 0) return '0 B';
    $units = ['B', 'KB', 'MB', 'GB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);
    return round($bytes, 2) . ' ' . $units[$pow];
}

function getWebsiteUrl($path) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $base_url = $protocol . '://' . $host . dirname($_SERVER['PHP_SELF']);
    return rtrim($base_url, '/') . '/view.php?site=' . $path;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Panel - <?php echo $settings['site_name']; ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-primary: #0a0a0a;
            --bg-secondary: #1a1a1a;
            --bg-tertiary: #252525;
            --primary: #ff6b35;
            --secondary: #ffa726;
            --success: #4caf50;
            --danger: #f44336;
            --warning: #ffb300;
            --text-primary: #ffffff;
            --text-secondary: #e0e0e0;
            --text-muted: #aaaaaa;
            --border-color: #333333;
            --radius-lg: 12px;
            --radius-md: 8px;
            --shadow-lg: 0 20px 40px rgba(255, 107, 53, 0.2);
            --shadow-md: 0 10px 20px rgba(255, 107, 53, 0.15);
            --glow-primary: 0 0 15px rgba(255, 107, 53, 0.5);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 167, 38, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        .admin-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Admin Header */
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .admin-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .admin-brand .logo {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-md);
            display: grid;
            place-items: center;
            font-size: 20px;
            color: white;
            box-shadow: var(--glow-primary);
        }

        .admin-brand h1 {
            font-size: 22px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .admin-brand span {
            font-size: 12px;
            color: var(--text-muted);
            display: block;
        }

        .admin-actions {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
        }

        .admin-badge {
            padding: 6px 14px;
            background: rgba(255, 107, 53, 0.15);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 20px;
            font-size: 12px;
            color: var(--primary);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .btn-logout {
            padding: 10px 20px;
            background: transparent;
            border: 1px solid var(--danger);
            color: var(--danger);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            text-decoration: none;
        }

        .btn-logout:hover {
            background: var(--danger);
            color: white;
            box-shadow: 0 0 20px rgba(244, 67, 54, 0.3);
        }

        .btn-back {
            padding: 10px 20px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            text-decoration: none;
        }

        .btn-back:hover {
            border-color: var(--primary);
            color: var(--text-primary);
        }

        /* Stats */
        .admin-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 20px;
            text-align: center;
            transition: var(--transition);
        }

        .stat-card:hover {
            border-color: var(--primary);
            transform: translateY(-3px);
            box-shadow: var(--shadow-md);
        }

        .stat-card .number {
            font-size: 28px;
            font-weight: 800;
            color: var(--primary);
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
        }

        .stat-card .label {
            font-size: 13px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 4px;
        }

        .stat-card .icon {
            font-size: 24px;
            color: var(--primary);
            margin-bottom: 8px;
            opacity: 0.7;
        }

        /* Dashboard Grid */
        .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }

        @media (min-width: 968px) {
            .dashboard-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        /* Cards */
        .card {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 24px;
            transition: var(--transition);
        }

        .card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-md);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border-color);
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .card-title i {
            color: var(--primary);
        }

        .card-title .badge {
            font-size: 11px;
            background: rgba(255, 107, 53, 0.15);
            color: var(--primary);
            padding: 2px 10px;
            border-radius: 12px;
            font-weight: 600;
        }

        /* Forms */
        .form-group {
            margin-bottom: 16px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-secondary);
        }

        .form-group label .required {
            color: var(--danger);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            font-family: inherit;
            font-size: 14px;
            transition: var(--transition);
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
        }

        .form-group textarea {
            min-height: 80px;
            resize: vertical;
        }

        .form-hint {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 4px;
        }

        .btn-primary {
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border: none;
            border-radius: var(--radius-md);
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md), var(--glow-primary);
        }

        .btn-danger {
            padding: 8px 16px;
            background: transparent;
            border: 1px solid var(--danger);
            color: var(--danger);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
        }

        .btn-danger:hover {
            background: var(--danger);
            color: white;
            box-shadow: 0 0 20px rgba(244, 67, 54, 0.3);
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 12px;
        }

        /* Site List */
        .site-list {
            max-height: 500px;
            overflow-y: auto;
        }

        .site-list::-webkit-scrollbar {
            width: 4px;
        }

        .site-list::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: var(--radius-md);
        }

        .site-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            margin-bottom: 10px;
            transition: var(--transition);
            flex-wrap: wrap;
            gap: 10px;
        }

        .site-item:hover {
            border-color: var(--primary);
        }

        .site-item .info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
        }

        .site-item .icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            border-radius: var(--radius-md);
            display: grid;
            place-items: center;
            font-size: 18px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
        }

        .site-item .icon-html { color: #ff6b35; }
        .site-item .icon-css { color: #ffa726; }
        .site-item .icon-js { color: #ffeb3b; }
        .site-item .icon-zip { color: var(--text-muted); }

        .site-item .details {
            flex: 1;
            min-width: 0;
        }

        .site-item .details .name {
            font-weight: 700;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .site-item .details .meta {
            font-size: 12px;
            color: var(--text-muted);
        }

        .site-item .details .url {
            font-size: 12px;
            color: var(--primary);
            text-decoration: none;
            display: block;
            word-break: break-all;
        }

        .site-item .actions {
            display: flex;
            gap: 8px;
            flex-shrink: 0;
        }

        .btn-icon {
            width: 34px;
            height: 34px;
            min-width: 34px;
            border-radius: var(--radius-md);
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            cursor: pointer;
            display: grid;
            place-items: center;
            transition: var(--transition);
        }

        .btn-icon:hover {
            border-color: var(--primary);
            color: var(--text-primary);
        }

        .btn-icon.danger:hover {
            border-color: var(--danger);
            color: var(--danger);
            background: rgba(244, 67, 54, 0.1);
        }

        /* Alerts */
        .alert {
            padding: 14px 18px;
            border-radius: var(--radius-md);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideDown 0.4s ease;
            border-left: 4px solid;
        }

        .alert-success {
            background: rgba(76, 175, 80, 0.1);
            border-color: var(--success);
            color: var(--success);
        }

        .alert-error {
            background: rgba(244, 67, 54, 0.1);
            border-color: var(--danger);
            color: var(--danger);
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .image-preview {
            width: 100px;
            height: 100px;
            border-radius: var(--radius-md);
            border: 2px solid var(--border-color);
            object-fit: cover;
            margin-top: 8px;
        }

        /* Settings Group */
        .settings-group {
            background: var(--bg-tertiary);
            border-radius: var(--radius-md);
            padding: 16px;
            margin-bottom: 16px;
            border: 1px solid var(--border-color);
        }

        .settings-group h4 {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .settings-group h4 i {
            color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .admin-header {
                flex-direction: column;
                align-items: stretch;
                gap: 15px;
            }

            .admin-actions {
                justify-content: stretch;
            }

            .admin-actions .btn-back,
            .admin-actions .btn-logout {
                flex: 1;
                justify-content: center;
            }

            .site-item {
                flex-direction: column;
                align-items: stretch;
            }

            .site-item .actions {
                justify-content: flex-end;
            }

            .card {
                padding: 16px;
            }

            .admin-stats {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 480px) {
            .admin-container {
                padding: 12px;
            }

            .admin-stats {
                grid-template-columns: 1fr;
            }

            .dashboard-grid {
                gap: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <!-- Admin Header -->
        <header class="admin-header">
            <div class="admin-brand">
                <div class="logo"><i class="fas fa-fire"></i></div>
                <div>
                    <h1><?php echo $settings['site_name']; ?></h1>
                    <span><i class="fas fa-shield-alt"></i> Control Panel</span>
                </div>
            </div>
            
            <div class="admin-actions">
                <span class="admin-badge">
                    <i class="fas fa-user"></i> <?php echo $settings['admin_username']; ?>
                </span>
                <a href="index.php" class="btn-back">
                    <i class="fas fa-globe"></i> View Site
                </a>
                <a href="?logout=1" class="btn-logout">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </header>

        <!-- Alerts -->
        <?php if (isset($_SESSION['admin_success'])): ?>
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                <?php echo $_SESSION['admin_success']; unset($_SESSION['admin_success']); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($_SESSION['admin_error'])): ?>
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                <?php echo $_SESSION['admin_error']; unset($_SESSION['admin_error']); ?>
            </div>
        <?php endif; ?>

        <!-- Stats -->
        <div class="admin-stats">
            <div class="stat-card">
                <div class="icon"><i class="fas fa-layer-group"></i></div>
                <div class="number"><?php echo count($uploaded_sites); ?></div>
                <div class="label">Total Sites</div>
            </div>
            <div class="stat-card">
                <div class="icon"><i class="fas fa-database"></i></div>
                <div class="number"><?php echo formatSize($total_size); ?></div>
                <div class="label">Storage Used</div>
            </div>
            <div class="stat-card">
                <div class="icon"><i class="fas fa-archive"></i></div>
                <div class="number"><?php 
                    $zip_count = 0;
                    foreach ($uploaded_sites as $s) { if ($s['type'] === 'zip') $zip_count++; }
                    echo $zip_count;
                ?></div>
                <div class="label">ZIP Sites</div>
            </div>
            <div class="stat-card">
                <div class="icon"><i class="fas fa-code"></i></div>
                <div class="number"><?php 
                    $single_count = 0;
                    foreach ($uploaded_sites as $s) { if ($s['type'] !== 'zip') $single_count++; }
                    echo $single_count;
                ?></div>
                <div class="label">Single Files</div>
            </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
            <!-- Site Management -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-layer-group"></i>
                        Manage Sites
                        <span class="badge"><?php echo count($uploaded_sites); ?></span>
                    </div>
                </div>

                <?php if (empty($uploaded_sites)): ?>
                    <div style="text-align: center; padding: 30px 20px; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                        <p>No sites deployed yet</p>
                    </div>
                <?php else: ?>
                    <div class="site-list">
                        <?php foreach ($uploaded_sites as $site): ?>
                            <div class="site-item">
                                <div class="info">
                                    <?php 
                                        $iconClass = 'icon-zip'; $faIcon = 'fa-file-archive';
                                        if ($site['type'] == 'html' || $site['type'] == 'htm') { $iconClass = 'icon-html'; $faIcon = 'fa-html5'; }
                                        elseif ($site['type'] == 'css') { $iconClass = 'icon-css'; $faIcon = 'fa-css3-alt'; }
                                        elseif ($site['type'] == 'js') { $iconClass = 'icon-js'; $faIcon = 'fa-js'; }
                                    ?>
                                    <div class="icon <?php echo $iconClass; ?>">
                                        <i class="fab <?php echo $faIcon; ?>"></i>
                                    </div>
                                    <div class="details">
                                        <span class="name"><?php echo $site['name']; ?></span>
                                        <a href="<?php echo $site['url']; ?>" target="_blank" class="url">
                                            <?php echo substr($site['url'], 0, 40) . '...'; ?>
                                        </a>
                                        <span class="meta">
                                            <?php echo formatSize($site['size']); ?> • 
                                            <?php echo date('M j, Y - g:i A', $site['time']); ?>
                                        </span>
                                    </div>
                                </div>
                                <div class="actions">
                                    <a href="<?php echo $site['url']; ?>" target="_blank" class="btn-icon" title="Open">
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                    <button class="btn-icon" onclick="copyLink('<?php echo $site['url']; ?>')" title="Copy URL">
                                        <i class="fas fa-link"></i>
                                    </button>
                                    <button class="btn-icon danger" onclick="confirmDelete('<?php echo $site['name']; ?>')" title="Delete">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Site Settings -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-cog"></i>
                        Site Settings
                    </div>
                </div>

                <form method="POST">
                    <!-- Basic Settings -->
                    <div class="settings-group">
                        <h4><i class="fas fa-palette"></i> Branding</h4>
                        
                        <div class="form-group">
                            <label>Site Name <span class="required">*</span></label>
                            <input type="text" name="site_name" value="<?php echo htmlspecialchars($settings['site_name']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Tagline</label>
                            <input type="text" name="site_tagline" value="<?php echo htmlspecialchars($settings['site_tagline']); ?>">
                            <div class="form-hint">Shown below the site name</div>
                        </div>
                        
                        <div class="form-group">
                            <label>Owner Name <span class="required">*</span></label>
                            <input type="text" name="owner_name" value="<?php echo htmlspecialchars($settings['owner_name']); ?>" required>
                            <div class="form-hint">Shown in the footer</div>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="settings-group">
                        <h4><i class="fas fa-share-alt"></i> Social Links</h4>
                        
                        <div class="form-group">
                            <label><i class="fab fa-whatsapp" style="color: #25D366;"></i> WhatsApp URL</label>
                            <input type="url" name="whatsapp_url" value="<?php echo htmlspecialchars($settings['whatsapp_url']); ?>" placeholder="https://whatsapp.com/channel/...">
                        </div>
                        
                        <div class="form-group">
                            <label><i class="fab fa-youtube" style="color: #FF0000;"></i> YouTube URL</label>
                            <input type="url" name="youtube_url" value="<?php echo htmlspecialchars($settings['youtube_url']); ?>" placeholder="https://youtube.com/@...">
                        </div>
                    </div>

                    <!-- Loader Image -->
                    <div class="settings-group">
                        <h4><i class="fas fa-image"></i> Loader Image</h4>
                        
                        <div class="form-group">
                            <label>Image URL</label>
                            <input type="url" name="loader_image" value="<?php echo htmlspecialchars($settings['loader_image']); ?>" placeholder="https://example.com/image.jpg">
                            <div class="form-hint">Enter the URL of the image to show while loading</div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px; flex-wrap: wrap;">
                            <span style="font-size: 13px; color: var(--text-secondary);">Current:</span>
                            <img src="<?php echo htmlspecialchars($settings['loader_image']); ?>" alt="Loader" class="image-preview" onerror="this.src='https://via.placeholder.com/100x100/333/ff6b35?text=MH'">
                            <span style="font-size: 12px; color: var(--text-muted); word-break: break-all; flex: 1;"><?php echo htmlspecialchars($settings['loader_image']); ?></span>
                        </div>
                    </div>

                    <!-- Footer Text -->
                    <div class="settings-group">
                        <h4><i class="fas fa-copyright"></i> Footer</h4>
                        
                        <div class="form-group">
                            <label>Footer Text</label>
                            <input type="text" name="footer_text" value="<?php echo htmlspecialchars($settings['footer_text']); ?>" placeholder="Powered by Innovation">
                            <div class="form-hint">Shown in the footer after the owner name</div>
                        </div>
                    </div>

                    <!-- Password Change -->
                    <div class="settings-group" style="border-color: rgba(255, 107, 53, 0.3);">
                        <h4><i class="fas fa-key" style="color: var(--warning);"></i> Change Admin Password</h4>
                        
                        <div class="form-group">
                            <label>Current Password <span class="required">*</span></label>
                            <input type="password" name="old_password" placeholder="Enter current password">
                        </div>
                        
                        <div class="form-group">
                            <label>New Password <span class="required">*</span></label>
                            <input type="password" name="new_password" placeholder="Enter new password">
                            <div class="form-hint">Leave blank to keep current password</div>
                        </div>
                    </div>

                    <button type="submit" name="update_settings" class="btn-primary">
                        <i class="fas fa-save"></i> Save All Settings
                    </button>
                </form>
            </div>
        </div>

        <!-- Footer -->
        <footer style="text-align: center; padding: 30px 0; color: var(--text-muted); font-size: 13px; border-top: 1px solid var(--border-color); margin-top: 30px;">
            <p>&copy; <?php echo date('Y'); ?> <strong class="text-gradient"><?php echo $settings['site_name']; ?></strong> - Admin Panel v2.0</p>
            <p style="font-size: 12px; margin-top: 5px;">
                <i class="fas fa-shield-alt"></i> Secure Admin Access
            </p>
        </footer>
    </div>

    <script>
        // Copy link
        function copyLink(url) {
            navigator.clipboard.writeText(url).then(() => {
                showToast('URL copied to clipboard!');
            });
        }

        // Show toast notification
        function showToast(msg) {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px; 
                background: var(--bg-secondary); border: 1px solid var(--primary);
                color: var(--text-primary); padding: 14px 20px; 
                border-radius: var(--radius-md); box-shadow: var(--shadow-lg), var(--glow-primary);
                z-index: 1000; font-family: 'Plus Jakarta Sans', sans-serif;
                animation: slideDown 0.4s ease;
                max-width: 90%;
            `;
            toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success); margin-right: 10px;"></i> ${msg}`;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.4s';
                setTimeout(() => toast.remove(), 400);
            }, 2500);
        }

        // Confirm delete
        function confirmDelete(siteName) {
            if (confirm(`Are you sure you want to delete "${siteName}"?\n\nThis action cannot be undone!`)) {
                window.location.href = `?delete=${encodeURIComponent(siteName)}`;
            }
        }

        // Prevent zoom on double-tap
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });

        // Prevent zoom on wheel
        document.addEventListener('wheel', function(event) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, { passive: false });
    </script>
</body>
</html>