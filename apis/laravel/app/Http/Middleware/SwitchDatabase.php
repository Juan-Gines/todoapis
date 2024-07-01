<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SwitchDatabase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $dbType = $request->header('x-db-type');

        switch ($dbType) {
            case 'postgres':
                config(['database.default' => 'pgsql']);
                break;
            case 'mysql':
                config(['database.default' => 'mysql']);
                break;
            case 'mongodb':
                config(['database.default' => 'mongodb']);
                break;
            case 'sqlserver':
                config(['database.default' => 'sqlsrv']);
                break;
            default:
                return response()->json(['error' => 'Invalid database type'], 400);
        }

        //DB::purge('default');
        //DB::reconnect('default');

        return $next($request);
    }
}
