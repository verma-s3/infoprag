<?php
  global $post;
/*
  Template Name: Services & Approach
*/
/**
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package InfoPrag
 */

/****************************************************
 * STORE ALL LOGIC IN CONTEXT AND OUTPUT TO VIEW
 ***************************************************/
$context = Timber::context();
$context['field'] = new Timber\Post();
$templates = array( 'page-services-approach.twig' );
Timber::render( $templates, $context );



