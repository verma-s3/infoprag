<?php
  global $post;
/*
  Template Name: Contact
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
$templates = array( 'page-contact.twig' );
Timber::render( $templates, $context );



