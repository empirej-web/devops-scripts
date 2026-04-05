const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { parse } = require('url');

const isAbsoluteUrl = (url) => {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol && parsedUrl.host;
};

const isLocalUrl = (url) => {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol === 'file:' || parsedUrl.protocol === 'http:' && parsedUrl.host === 'localhost';
};

const isRelativeUrl = (url) => {
  const parsedUrl = new URL(url);
  return !parsedUrl.protocol;
};

const resolveRelativeUrl = (baseUrl, relativeUrl) => {
  if (isAbsoluteUrl(relativeUrl)) return relativeUrl;
  if (!isRelativeUrl(relativeUrl)) throw new Error(`Invalid URL: ${relativeUrl}`);
  return new URL(relativeUrl, baseUrl).href;
};

const absoluteUrl = (baseUrl, relativeUrl) => {
  if (!baseUrl || !relativeUrl) return relativeUrl;
  return isRelativeUrl(relativeUrl) ? resolveRelativeUrl(baseUrl, relativeUrl) : relativeUrl;
};

module.exports = {
  isAbsoluteUrl,
  isLocalUrl,
  isRelativeUrl,
  resolveRelativeUrl,
  absoluteUrl,
};