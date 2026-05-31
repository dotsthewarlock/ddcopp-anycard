# AnyCard Project History

## Purpose

## Major Decisions

- AnyCard now uses a named Target Window (`anycardTargetWindow`) so Generated Card Links and Bookmarklet workflows can attempt to reuse the same Popup Window.
- The original AnyCard Window may attempt to drive the Target Window through the Bookmarklet workflow, but browser same-origin security remains the source of truth.
- Because `anycard.ddcopp.com` and `www.anycard.ca` are different origins, direct cross-window DOM access may be blocked by browsers even when the Target Window is successfully reused.
- The supported fallback workflow is to run the Bookmarklet directly inside the Target Window when same-origin restrictions prevent remote filling.
- External-site automation architecture reviewed.
  - iframe-based integration is not considered a viable primary solution due to browser security restrictions and external-site embedding limitations.
  - Browser same-origin policy prevents reliable direct DOM control of `www.anycard.ca` from the AnyCard application origin.
  - The project will continue using a Bookmarklet-first automation strategy.
  - Future work should focus on improving Bookmarklet reliability and user workflow rather than pursuing iframe workarounds.
  - Backend/proxy/API solutions are intentionally avoided unless an official supported integration path becomes available.

## Features Implemented

## Known Issues

- Cross-origin browser restrictions may prevent the original AnyCard Window from directly filling the AnyCard Target Window.

## Future Ideas

## Lessons Learned

# Major Project Reviews