<?php

namespace Steliosn1\Plugin\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Steliosn1\Plugin\Plugin
 */
class Plugin extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Steliosn1\Plugin\Plugin::class;
    }
}
