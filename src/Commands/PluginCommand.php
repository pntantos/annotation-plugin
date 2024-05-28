<?php

namespace Steliosn1\Plugin\Commands;

use Illuminate\Console\Command;

class PluginCommand extends Command
{
    public $signature = 'plugin';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
