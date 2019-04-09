<?php

namespace App\Providers;

use League\Flysystem\Filesystem;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Storage::extend('dropbox', function ($app, $config) {
            $client = new DropboxClient(
                $config['access_token']
            );
            return new Filesystem(new DropboxAdapter($client));
        });
    }

    /**
     * Register any application services.
     */
    public function register()
    {
    }
}
