<?php

/**
* @OA\Schema(
*   schema="LoginData",
*   description="Login response",
*   @OA\Property(
*       property="accessToken",
*       title="accessToken",
*       type="string",
*       description="API Auth Token",
*   ),
*   @OA\Property(
*       property="tokenType",
*       title="tokenType",
*       type="string",
*       description="Token type",
*   ),
*   @OA\Property(
*       property="expiresAt",
*       title="expiresAt",
*       type="string",
*       description="Token expiration date",
*   )
* )
*/

/**
* @OA\Schema(
*   schema="AvailableSections",
*   description="Sections available for Module creation",
*   @OA\Property(
*       property="sections_available",
*       title="sections_available",
*       type="array",
*       @OA\Items(type="string")
*   ),
* )
*/

/**
* @OA\Schema(
*   schema="CurrentPeriodStudents",
*   description="Login response",
*   @OA\Property(
*       property="period",
*       title="period",
*       ref="#/components/schemas/Period"
*   ),
*   @OA\Property(
*       property="students",
*       title="students",
*       type="array",
*       @OA\Items(ref="#/components/schemas/User")
*   ),
* )
*/

/**
* @OA\Schema(
*   schema="ImageUploaded",
*   description="Login response",
*   @OA\Property(
*       property="id",
*       title="id",
*       type="integer",
*       format="int64"
*   ),
*   @OA\Property(
*       property="name",
*       title="name",
*       type="string",
*   ),
*   @OA\Property(
*       property="url",
*       title="url",
*       type="string",
*   ),
*   @OA\Property(
*       property="status",
*       title="status",
*       type="string",
*   ),
* )
*/
